import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import {
  Client as ClientType,
  RootQueryType,
} from "../../__generated__/graphql";
import { ADD_CLIENT } from "../../services/graphql/mutations/addClient";
import { GET_CLIENTS } from "../../services/graphql/getClients";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().min(10).required(),
  })
  .required();

const useClientForm = () => {
  const [addClient] = useMutation<{ addClient: ClientType }>(ADD_CLIENT);
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
    email,
    phone,
  }: {
    name: string;
    email: string;
    phone: string;
  }) {
    try {
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
export default useClientForm;
