import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

export const useResponsiveDesign = () => {
  const theme = useTheme();
  const isSmallScreenSize = useMediaQuery(theme.breakpoints.only("xs"));

  return isSmallScreenSize;
};
