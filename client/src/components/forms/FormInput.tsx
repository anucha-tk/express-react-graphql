import { FormErrorMessage, FormLabel, Grid, Input } from "@chakra-ui/react";

export const FormInput = ({
  name,
  register,
  errors,
}: {
  name: string;
  register: any;
  errors: any;
}) => {
  return (
    <Grid py={2}>
      <FormLabel htmlFor={name}>{name.toUpperCase()}</FormLabel>
      <Input id={name} placeholder={name} {...register(`${name}`)} />
      <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
    </Grid>
  );
};
