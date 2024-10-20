import { Dispatch } from "react";
import { Celebrity } from "../../../types";
import { THE_MOVIE_DB_IMAGE_DOMAIN_URL } from "../../../utils";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

interface Props {
  celebrity: Celebrity;
  setSelectedCelebrity: Dispatch<React.SetStateAction<Celebrity | null>>;
}

const CelebrityCard: React.FC<Props> = ({
  celebrity,
  setSelectedCelebrity,
}) => {
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
    <Card
      style={{ width: cardWidth, height: 360, borderRadius: 12 }}
      elevation={2}
    >
      <CardActionArea onClick={() => setSelectedCelebrity(celebrity)}>
        <CardMedia
          sx={{ height: 300, width: 200 }}
          image={`${THE_MOVIE_DB_IMAGE_DOMAIN_URL}${celebrity.profile_path}`}
          title={celebrity.name}
        />
        <CardContent>
          <Typography variant="body1" textAlign="center" fontWeight="bold">
            {celebrity.name}
          </Typography>
        </CardContent>
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            borderRadius: 15,
            width: 32,
            height: 32,
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <Typography variant="body1" textAlign="center" fontWeight="bold">
            {Math.round(celebrity.popularity)}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CelebrityCard;
