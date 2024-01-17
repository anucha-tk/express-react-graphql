import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
    }
  }
`;
