import { Dispatch } from "react";
import { Celebrity } from "../../../types";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        {selectedCelebrity?.name}
      </Box>
    </Modal>
  );
};

export default CelebrityModal;
