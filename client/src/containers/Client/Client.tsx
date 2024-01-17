import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { RootQueryType } from "../../__generated__/graphql";
import { GET_CLIENTS } from "../../services/graphql/getClients";
import CModal from "../../components/CModal";
import { CForm } from "../../components/forms/CForm";
import { ClientCard } from "../../components/ClientCard";
import useClientForm from "./useClientform";
import { CardMain } from "../../components/CardMain";
import { FormInput } from "../../components/forms/FormInput";

export const Client = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading, data } = useQuery<RootQueryType>(GET_CLIENTS);
  const clients = data?.clients ?? [];

  const {
    handleSubmit,
    register,
    isSubmitting,
    isValid,
    onSubmit,
    errors,
    reset,
  } = useClientForm();

  return (
    <CardMain name={"Clients"} onOpen={onOpen} loading={loading}>
      <CModal isOpen={isOpen} onClose={onClose}>
        <CForm
          onClose={onClose}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          isValid={isValid}
          reset={reset}
        >
          <FormInput name="name" register={register} errors={errors.name} />
          <FormInput name="email" register={register} errors={errors.email} />
          <FormInput name="phone" register={register} errors={errors.phone} />
        </CForm>
      </CModal>
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
    </CardMain>
  );
};
