import { Dispatch } from "react";
import { Celebrity } from "../../../types";
import { THE_MOVIE_DB_IMAGE_DOMAIN_URL } from "../../../utils";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  selectedCelebrity: Celebrity | null;
  setSelectedCelebrity: Dispatch<React.SetStateAction<Celebrity | null>>;
}

const CelebrityModal: React.FC<Props> = ({
  selectedCelebrity,
  setSelectedCelebrity,
}) => {
  return (
    <Modal
      open={!!selectedCelebrity}
      onClose={() => setSelectedCelebrity(null)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
          >
            <Typography variant="h5">{selectedCelebrity?.name}</Typography>
            <CloseIcon
              sx={{
                color: "gray",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "gray",
              }}
              onClick={() => setSelectedCelebrity(null)}
            />
          </Box>
          <Box sx={{ display: "flex", flex: 1, mt: 2 }}>
            {selectedCelebrity?.profile_path && (
              <Box
                component="img"
                src={`${THE_MOVIE_DB_IMAGE_DOMAIN_URL}${selectedCelebrity?.profile_path}`}
              />
            )}
            <Box sx={{ ml: 3 }}>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  {`Gender: `}
                </Typography>
                {selectedCelebrity?.gender}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <Typography component="span" fontWeight="bold">
                  {`Popularity: `}
                </Typography>
                {selectedCelebrity?.popularity}
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 2 }}>
                Known for:
              </Typography>
              {selectedCelebrity &&
                selectedCelebrity.known_for.map((item) => (
                  <Box
                    key={item.id}
                    sx={{ display: "flex", alignItems: "center", mt: 2 }}
                  >
                    <Box
                      component="img"
                      src={`${THE_MOVIE_DB_IMAGE_DOMAIN_URL}${item.poster_path}`}
                      sx={{ width: 60, height: 90 }}
                    />
                    <Typography sx={{ ml: 1 }} fontWeight="bold">
                      {item?.title ?? item?.name}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CelebrityModal;
