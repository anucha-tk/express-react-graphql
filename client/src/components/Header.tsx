import { Box, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

function Header() {
  return (
    <Flex height={50} minWidth="max-content" alignItems="center">
      <Box>
        <Heading size="md">Express GraphQL App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2" mr={2}>
        <Link to="/">Clients</Link>
        <Link to="/projects">Projects</Link>
      </ButtonGroup>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
}

export default Header;
