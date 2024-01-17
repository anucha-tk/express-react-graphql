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
} from "@chakra-ui/react";
import { Project } from "../__generated__/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

export const Card = ({ project }: { project: Maybe<Project> }) => {
  let colorStaus = "purple";
  switch (project?.status) {
    case "In Progress":
      colorStaus = "orange";
      break;
    case "Completed":
      colorStaus = "green";
      break;
  }

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
    </CardChakra>
  );
};
