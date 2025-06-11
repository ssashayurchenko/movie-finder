import { Modal, Box, Typography, Button } from "@mui/material";
import { FC } from "react";
import { AddFilmModalProps } from "types/films.interface";
import { style } from "./AddFilmModal.styles";

export const AddFilmModal: FC<AddFilmModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add New Film
        </Typography>
        <Button
          onClick={onClose}
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
