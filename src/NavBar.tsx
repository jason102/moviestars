import { useContext } from "react";
import { CelebrityFetcherContext } from "./CelebrityFetcherContext";
import { useResponsiveDesign } from "./useResponsiveDesign";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const NavBar: React.FC = () => {
  const { query, setQuery } = useContext(CelebrityFetcherContext);

  const isSmallScreenSize = useResponsiveDesign();

  return (
    <AppBar>
      <Toolbar>
        <Box
          sx={
            isSmallScreenSize
              ? {
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 1,
                  mb: 1,
                }
              : {
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }
          }
        >
          <Link href={"https://chartmetric.com/"}>
            <Box
              component="img"
              src="./src/assets/CM_logo.svg"
              width={180}
              height={40}
            />
          </Link>
          <TextField
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            size="small"
            placeholder="Search for a celebrity"
            value={query}
            onChange={({ target }) => setQuery(target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "lightgray" }} />
                  </InputAdornment>
                ),
              },
            }}
            fullWidth={isSmallScreenSize}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
