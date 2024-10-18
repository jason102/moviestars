import { useContext } from "react";
import { CelebrityFetcherContext } from "./CelebrityFetcherContext";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NavBar: React.FC = () => {
  const { query, setQuery } = useContext(CelebrityFetcherContext);

  return (
    <AppBar>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
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
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
