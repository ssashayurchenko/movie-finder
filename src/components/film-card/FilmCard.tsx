import { Film } from "types/films.interface";
import { Box, Typography, Paper, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFilm } from "features/films/filmsSlice";
import { useAppDispatch } from "app/hooks";
import { styles } from "./FilmCard.styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import FilmModal from "components/film-modal/FilmModal";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const dispatch = useAppDispatch();
  const handleDeleteFilmBtn = () => {
    dispatch(deleteFilm(film.id));
  };

  return (
    <Paper key={film.id} elevation={3} sx={styles.cardWrapper}>
      <Typography variant="h6" component="h2">
        {film.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Format: {film.format}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Year: {film.year}
      </Typography>
      <Box sx={styles.buttonBox}>
        <Button
          aria-label="show film info"
          variant="contained"
          startIcon={<ExpandMoreIcon />}
          onClick={handleOpen}
          color="primary"
        >
          Show more
        </Button>
        <FilmModal open={isModalOpen} close={handleClose} filmId={film.id} />
        <Button
          aria-label="delete film"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteFilmBtn}
          color="primary"
        >
          Delete Film
        </Button>
      </Box>
    </Paper>
  );
}
