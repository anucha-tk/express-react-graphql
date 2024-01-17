import { gql } from "@apollo/client";

export const DELETE_CLIENT = gql(`
  mutation DeleteClient($id: String!) {
      deleteClient(id: $id) {
          id
          name
          email
          phone
      }
  }
`);
