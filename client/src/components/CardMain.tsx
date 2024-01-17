import { AddIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Spinner } from "@chakra-ui/react";

export const CardMain = ({
  onOpen,
  children,
  loading,
  name,
}: {
  name: string;
  loading: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Flex justifyContent={"space-between"} alignContent={"center"}>
        <Heading size={"md"}>{name}</Heading>
        <IconButton
          aria-label="add button"
          icon={<AddIcon />}
          onClick={() => onOpen()}
        />
      </Flex>
      {loading && <Spinner size="xl" />}
      {children}
    </div>
  );
};
