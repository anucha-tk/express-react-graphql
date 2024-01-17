import {
  Text,
  Box,
  CardBody,
  Stack,
  Card as CardChakra,
  CardHeader,
  Heading,
  StackDivider,
  Badge,
  CardFooter,
  IconButton,
  useDisclosure,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { Project, RootQueryType } from "../../__generated__/graphql";
import { DELETE_PROJECT } from "../../services/graphql/mutations/deleteProject";
import { GET_PROJECTS } from "../../services/graphql/getProjects";
import { CForm } from "../../components/forms/CForm";
import { FormInput } from "../../components/forms/FormInput";
import CModal from "../../components/CModal";
import useUpdateProjectForm from "./useUpdateProjectForm";

export const ProjectCard = ({ project }: { project: Maybe<Project> }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    isSubmitting,
    isValid,
    onSubmit,
    errors,
    reset,
  } = useUpdateProjectForm(project);

  let colorStaus = "purple";
  switch (project?.status) {
    case "In Progress":
      colorStaus = "orange";
      break;
    case "Completed":
      colorStaus = "green";
      break;
  }

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project?.id },
    refetchQueries: [{ query: GET_PROJECTS }],
    update(cache, { data: { deleteProject } }) {
      const data = cache.readQuery<RootQueryType>({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: data?.projects?.filter(
            (project) => project?.id !== deleteProject.id,
          ),
        },
      });
    },
  });

  return (
    <CardChakra>
      <CardHeader>
        <Heading size="md">{project?.id}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {project?.name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {project?.description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Status
            </Heading>
            <Badge colorScheme={colorStaus}>{project?.status}</Badge>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter justifyContent={"center"} gap={2}>
        <IconButton
          aria-label="edit button"
          icon={<EditIcon />}
          colorScheme="green"
          onClick={() => onOpen()}
        >
          Edit
        </IconButton>
        <IconButton
          aria-label="delete button"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => deleteProject()}
        >
          Delete
        </IconButton>
      </CardFooter>

      <CModal title="Edit your project" isOpen={isOpen} onClose={onClose}>
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
        </CForm>
      </CModal>
    </CardChakra>
  );
};
