import { useQuery } from "@apollo/client";
import {
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { RootQueryType } from "../../__generated__/graphql";
import { GET_PROJECTS } from "../../services/graphql/getProjects";
import { ProjectCard } from "../../components/ProjectCard";
import { CardMain } from "../../components/CardMain";
import CModal from "../../components/CModal";
import { CForm } from "../../components/forms/CForm";
import { FormInput } from "../../components/forms/FormInput";
import useProjectForm from "./useProjectform";

export const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, data } = useQuery<RootQueryType>(GET_PROJECTS);
  const projects = data?.projects || [];

  const {
    handleSubmit,
    register,
    isSubmitting,
    isValid,
    onSubmit,
    errors,
    reset,
  } = useProjectForm();

  return (
    <CardMain name="Projects" onOpen={onOpen} loading={loading}>
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
          <FormInput
            name="description"
            register={register}
            errors={errors.description}
          />
          <FormLabel htmlFor={"status"}>Status</FormLabel>
          <Select id={"status"} {...register("status")}>
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
          <FormErrorMessage>
            {errors && errors.status?.message}
          </FormErrorMessage>
          <FormInput
            name="clientId"
            register={register}
            errors={errors.clientId}
          />
        </CForm>
      </CModal>
      <Grid
        gap={6}
        pt={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {projects.map((project) => (
          <GridItem key={project?.id}>
            <ProjectCard project={project} />
          </GridItem>
        ))}
      </Grid>
    </CardMain>
  );
};
