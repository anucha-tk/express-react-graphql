import { Box, Grid } from "@chakra-ui/react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Project } from "./containers/Project";
import { Client } from "./containers/Client";

function App() {
  return (
    <Box p={4}>
      <Header />
      <Grid>
        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </Grid>
    </Box>
  );
}

export default App;
