import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

export const ClientForm = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
  handleSubmit,
  onClose,
  isValid,
}: {
  onClose: () => void;
  onSubmit: any;
  register: any;
  errors: any;
  isSubmitting: any;
  handleSubmit: any;
  isValid: boolean;
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody pb={6}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input id="name" placeholder="name" {...register("name")} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" placeholder="email" {...register("email")} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input id="phone" placeholder="phone" {...register("phone")} />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            onClick={() => {
              isValid && onClose();
            }}
          >
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </>
  );
};
