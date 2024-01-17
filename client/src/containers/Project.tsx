import { useQuery } from "@apollo/client";
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { RootQueryType } from "../__generated__/graphql";
import { GET_PROJECTS } from "../services/graphql/getProjects";
import { AddIcon } from "@chakra-ui/icons";
import { ProjectCard } from "../components/ProjectCard";

export const Project = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, data } = useQuery<RootQueryType>(GET_PROJECTS);
  const projects = data?.projects || [];

  return (
    <div>
      <Flex justifyContent={"space-between"} alignContent={"center"}>
        <Heading size={"md"}>Projects</Heading>
        <IconButton
          aria-label="add button"
          icon={<AddIcon />}
          onClick={() => onOpen()}
        />
      </Flex>
      {loading && <Spinner size="xl" />}
      <Grid
        gap={6}
        pt={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {projects.map((project) => (
          <GridItem key={project?.id}>
            <ProjectCard project={project} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
