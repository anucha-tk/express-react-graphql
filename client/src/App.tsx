import { Box, Grid } from "@chakra-ui/react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";

function App() {
  return (
    <Box>
      <Header />
      <Grid>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Grid>
    </Box>
  );
}

export default App;
