import { Celebrity } from "../../../types";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

interface Props {
  celebrity: Celebrity;
}

const CelebrityCard: React.FC<Props> = ({ celebrity }) => {
  // Breakpoints for responsiveness
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  // Define card width
  let cardWidth = "300px"; // xs
  if (isSm) cardWidth = "200px";
  if (isMd) cardWidth = "200px";
  if (isLg) cardWidth = "200px";
  if (isXl) cardWidth = "200px";

  return (
    <Card style={{ width: cardWidth, height: "300px" }}>
      <CardContent>
        <Typography variant="h6">{celebrity.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CelebrityCard;
