import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Project, RootQueryType } from "../../__generated__/graphql";
import { ADD_PROJECT } from "../../services/graphql/mutations/addProject";
import { GET_PROJECTS } from "../../services/graphql/getProjects";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    status: yup.string().required(),
    clientId: yup.string().required(),
  })
  .required();

const useProjectForm = () => {
  const [addProject] = useMutation<{ addProject: Project }>(ADD_PROJECT);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit({
    name,
    description,
    status,
    clientId,
  }: {
    name: string;
    description: string;
    status: string;
    clientId: string;
  }) {
    try {
      addProject({
        variables: { name, description, status, clientId },
        update(cache, { data }) {
          const existingData = cache.readQuery<RootQueryType>({
            query: GET_PROJECTS,
          });
          if (
            data &&
            data.addProject &&
            existingData &&
            existingData.projects
          ) {
            cache.writeQuery({
              query: GET_PROJECTS,
              data: { projects: [...existingData.projects, data.addProject] },
            });
          }
        },
      });
    } finally {
      reset();
    }
  }

  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isValid,
    onSubmit,
    reset,
  };
};
export default useProjectForm;
