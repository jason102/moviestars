import { useContext } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { CelebrityFetcherContext } from "../../CelebrityFetcherContext";
import GridComponents from "./components/GridComponents";
import CelebrityCard from "./components/CelebrityCard";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home: React.FC = () => {
  const { celebrities } = useContext(CelebrityFetcherContext);

  return (
    <Box component="main" sx={{ p: 3 }}>
      {/* <Toolbar /> is used for top padding as the <NavBar /> (AppBar) floats above the content (as recommended in MUI docs) */}
      <Toolbar />
      <Typography variant="h5">Celebrities</Typography>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          height: "calc(100vh - 145px)",
          backgroundColor: "green",
        }}
      >
        <VirtuosoGrid
          style={{ height: "100%", width: "100%" }}
          totalCount={celebrities.length}
          data={celebrities}
          // endReached={loadMore}
          components={GridComponents}
          itemContent={(_, celebrity) => (
            <CelebrityCard celebrity={celebrity} />
          )}
        />
      </Box>
    </Box>
  );
};

export default Home;
