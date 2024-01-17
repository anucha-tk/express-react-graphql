import {
  GraphQLID,
  GraphQLList,
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
      resolve: (parent, _) => Client.findById(parent.id),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => Project.find(),
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

export default new GraphQLSchema({
  query: RootQuery,
});
