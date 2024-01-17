import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Project, RootQueryType } from "../../__generated__/graphql";
import { GET_PROJECTS } from "../../services/graphql/getProjects";
import { UPDATE_PROJECT } from "../../services/graphql/mutations/updateProject";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

const useProjectForm = (project: any) => {
  const [updateProject] = useMutation<{ updateProject: Project }>(
    UPDATE_PROJECT,
  );

  let status = "new";
  switch (project.status) {
    case "In Progress":
      status = "progress";
      break;
    case "Completed":
      status = "completed";
      break;
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    values: {
      name: project.name,
      description: project.description,
      status: status,
    },
    resolver: yupResolver(schema),
  });

  function onSubmit({
    name,
    description,
    status,
  }: {
    name: string;
    description: string;
    status: string;
  }) {
    try {
      updateProject({
        variables: { id: project.id, name, description, status },
        update(cache, { data }) {
          const existingData = cache.readQuery<RootQueryType>({
            query: GET_PROJECTS,
          });
          if (
            data &&
            data.updateProject &&
            existingData &&
            existingData.projects
          ) {
            cache.writeQuery({
              query: GET_PROJECTS,
              data: {
                updateProject: [...existingData.projects, data.updateProject],
              },
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
