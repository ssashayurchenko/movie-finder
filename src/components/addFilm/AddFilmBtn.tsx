import { Button } from "@mui/material";
import { AddFilmModal } from "components/AddFilmModal/AddFilmModal";
import { useState } from "react";

export default function AddFilmBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Add film
      </Button>
      <AddFilmModal open={isModalOpen} onClose={handleClose} />
    </>
  );
}
