import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home: React.FC = () => {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h5">Celebrities</Typography>
    </Box>
  );
};

export default Home;
