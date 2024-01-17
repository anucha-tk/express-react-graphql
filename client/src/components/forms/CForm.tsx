import { FormControl, Button, ModalBody, ModalFooter } from "@chakra-ui/react";

export const CForm = ({
  onSubmit,
  errors,
  isSubmitting,
  handleSubmit,
  onClose,
  isValid,
  reset,
  children,
}: {
  onClose: () => void;
  onSubmit: any;
  register: any;
  errors: any;
  isSubmitting: any;
  handleSubmit: any;
  isValid: boolean;
  reset: any;
  children: React.ReactNode;
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody pb={6}>
          <FormControl isInvalid={errors.name}>{children}</FormControl>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            onClick={() => isValid && onClose()}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};
