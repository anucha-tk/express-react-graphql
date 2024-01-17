import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import Project from "../commons/models/Project";
import Client from "../commons/models/Client";

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent) => Client.findById(parent.clientId),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      resolve: () => Project.find(),
      type: new GraphQLList(ProjectType),
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Project.findById(args);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => Client.find(),
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Client.findById(args);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { name, email, phone }) {
        const client = new Client({
          name,
          email,
          phone,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id }) => {
        // cascade sibling
        await Project.deleteMany({ clientId: id });
        return Client.findOneAndDelete(id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              procress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { name, description, status, clientId }) {
        const project = new Project({
          name,
          description,
          status,
          clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { id }) => Project.findByIdAndDelete(id),
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(_, { id, name, description, status }) {
        return Project.findByIdAndUpdate(
          id,
          {
            name,
            description,
            status,
          },
          { new: true },
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
