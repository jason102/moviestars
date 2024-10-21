import { useContext, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { CelebrityFetcherContext } from "../../CelebrityFetcherContext";
import GridComponents from "./components/GridComponents";
import CelebrityCard from "./components/CelebrityCard";
import CelebrityModal from "./components/CelebrityModal";
import { Celebrity } from "../../types";
import { useResponsiveDesign } from "../../useResponsiveDesign";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Home: React.FC = () => {
  const { celebrities, loadMoreCelebrities, error, fetchCelebrities } =
    useContext(CelebrityFetcherContext);

  const isSmallScreenSize = useResponsiveDesign();

  const [selectedCelebrity, setSelectedCelebrity] = useState<Celebrity | null>(
    null
  );

  return (
    <>
      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar /> is used for top padding as the <NavBar /> (AppBar) floats above the content (as recommended in MUI docs) */}
        {isSmallScreenSize ? <Box sx={{ height: 90 }} /> : <Toolbar />}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Celebrities
        </Typography>
        {error && (
          <Alert
            variant="filled"
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={fetchCelebrities}>
                RETRY
              </Button>
            }
          >
            {error}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "calc(100vh - 144px)",
          }}
        >
          <VirtuosoGrid
            style={{ height: "100%", width: "100%" }}
            totalCount={celebrities.length}
            data={celebrities}
            endReached={loadMoreCelebrities}
            components={GridComponents}
            itemContent={(_, celebrity) => (
              <CelebrityCard
                celebrity={celebrity}
                setSelectedCelebrity={setSelectedCelebrity}
              />
            )}
          />
        </Box>
      </Box>
      <CelebrityModal
        selectedCelebrity={selectedCelebrity}
        setSelectedCelebrity={setSelectedCelebrity}
      />
    </>
  );
};

export default Home;
