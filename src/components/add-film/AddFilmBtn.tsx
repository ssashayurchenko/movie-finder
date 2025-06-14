import { Button } from "@mui/material";
import { AddFilmModal } from "components/add-film-modal/AddFilmModal";
import { useState } from "react";

type AddFilmBtnProps = {
  onFilmAdded?: () => void;
};

export default function AddFilmBtn({ onFilmAdded }: AddFilmBtnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        aria-label="add film"
        variant="contained"
        sx={{ width: "100%", maxWidth: "250px" }}
      >
        Add film
      </Button>
      <AddFilmModal
        open={isModalOpen}
        onClose={handleClose}
        onFilmAdded={onFilmAdded}
      />
    </>
  );
}
