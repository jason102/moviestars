import { Dispatch } from "react";
import { Celebrity } from "../../../types";
import { THE_MOVIE_DB_IMAGE_DOMAIN_URL } from "../../../utils";
import { useResponsiveDesign } from "../../../useResponsiveDesign";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

interface Props {
  celebrity: Celebrity;
  setSelectedCelebrity: Dispatch<React.SetStateAction<Celebrity | null>>;
}

const CelebrityCard: React.FC<Props> = ({
  celebrity,
  setSelectedCelebrity,
}) => {
  const isSmallScreenSize = useResponsiveDesign();
  const cardWidth = isSmallScreenSize ? 160 : 200;
  const cardHeight = isSmallScreenSize ? 300 : 360;
  const imageHeight = isSmallScreenSize ? 240 : 300;

  return (
    <Card
      style={{ width: cardWidth, height: cardHeight, borderRadius: 12 }}
      elevation={2}
    >
      <CardActionArea onClick={() => setSelectedCelebrity(celebrity)}>
        <CardMedia
          sx={{ height: imageHeight, width: cardWidth }}
          image={`${THE_MOVIE_DB_IMAGE_DOMAIN_URL}${celebrity.profile_path}`}
          title={celebrity.name}
          component="img"
          alt={`Profile picture of ${celebrity.name}`}
        />
        <CardContent>
          <Typography
            variant={isSmallScreenSize ? "body2" : "body1"}
            textAlign="center"
            fontWeight="bold"
          >
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
