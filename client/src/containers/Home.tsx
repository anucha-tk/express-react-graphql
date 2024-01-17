import { useQuery } from "@apollo/client";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { RootQueryType } from "../__generated__/graphql";
import { Card } from "../components/Card";
import { GET_PROJECTS } from "../services/graphql/getProjects";

export const Home = () => {
  const { loading, data } = useQuery<RootQueryType>(GET_PROJECTS);
  const projects = data?.projects || [];

  return (
    <div>
      {loading && <Spinner size="xl" />}
      <Grid
        gap={6}
        pt={2}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {projects.map((project) => (
          <GridItem key={project?.id}>
            <Card project={project} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
