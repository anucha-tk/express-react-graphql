import {
  Text,
  Box,
  CardBody,
  Stack,
  Card as CardChakra,
  CardHeader,
  Heading,
  StackDivider,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../services/graphql/getClients";
import { Client, RootQueryType } from "../../__generated__/graphql";
import { DELETE_CLIENT } from "../../services/graphql/mutations/deleteClient";

export const ClientCard = ({ client }: { client: Maybe<Client> }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client?.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const data = cache.readQuery<RootQueryType>({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: data?.clients?.filter(
            (client) => client?.id !== deleteClient.id,
          ),
        },
      });
    },
  });

  return (
    <CardChakra>
      <CardHeader>
        <Heading size="md">{client?.id}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {client?.name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Email
            </Heading>
            <Text pt="2" fontSize="sm">
              {client?.email}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Phone
            </Heading>
            <Text pt="2" fontSize="sm">
              {client?.phone}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={"center"}>
        <IconButton
          aria-label="delete button"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => deleteClient()}
        >
          Delete
        </IconButton>
      </CardFooter>
    </CardChakra>
  );
};
