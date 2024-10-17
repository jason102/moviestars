import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const NavBar: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link href={"https://chartmetric.com/"} underline="none">
          <Box
            component="img"
            src="./src/assets/CM_logo.svg"
            width={180}
            height={40}
          />
        </Link>
        <nav></nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
