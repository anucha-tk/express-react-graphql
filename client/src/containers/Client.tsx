import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import { Client as ClientType, RootQueryType } from "../__generated__/graphql";
import { GET_CLIENTS } from "../services/graphql/getClients";
import { AddIcon } from "@chakra-ui/icons";
import CModal from "../components/CModal";
import { ClientForm } from "../components/forms/ClientForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ADD_CLIENT } from "../services/graphql/mutations/addClient";
import { ClientCard } from "../components/ClientCard";

export const Client = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading, data } = useQuery<RootQueryType>(GET_CLIENTS);
  const clients = data?.clients ?? [];

  const [addClient] = useMutation<{ addClient: ClientType }>(ADD_CLIENT);

  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().min(10).required(),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit({
    name,
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    addClient({
      variables: { name, email, phone },
      update(cache, { data }) {
        const existingData = cache.readQuery<RootQueryType>({
          query: GET_CLIENTS,
        });
        if (data && data.addClient && existingData && existingData.clients) {
          cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: [...existingData.clients, data.addClient] },
          });
        }
      },
    });
  }

  return (
    <div>
      <Flex justifyContent={"space-between"} alignContent={"center"}>
        <Heading size={"md"}>Clients</Heading>
        <IconButton
          aria-label="add button"
          icon={<AddIcon />}
          onClick={() => onOpen()}
        />
      </Flex>
      <CModal isOpen={isOpen} onClose={onClose}>
        <ClientForm
          onClose={onClose}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          isValid={isValid}
        />
      </CModal>
      {loading && <Spinner size="xl" />}
      <Grid
        gap={6}
        pt={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {clients.map((client) => (
          <GridItem key={client?.id}>
            <ClientCard client={client} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
