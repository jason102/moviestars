import { useContext } from "react";
import { CelebrityFetcherContext } from "../CelebrityFetcherContext";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home: React.FC = () => {
  const { celebrities, loading, error } = useContext(CelebrityFetcherContext);

  // <Toolbar /> component is used for vertical spacing as the <NavBar /> (AppBar) floats above the content (as recommended in MUI docs)
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h5">Celebrities</Typography>
    </Box>
  );
};

export default Home;
