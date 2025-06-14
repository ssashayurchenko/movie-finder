import { Film } from "types/films.interface";
import { Box, Typography, Paper, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { deleteFilm } from "features/films/filmsSlice";
import { useAppDispatch } from "app/hooks";
import { styles } from "./FilmCard.styles";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
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

      <Box mt={1}>
        <Typography variant="subtitle2">Stars:</Typography>
        <List>
          {film.actors?.map((actor, index) => (
            <ListItem key={index}>
              <Typography variant="body2">{actor}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        aria-label="delete film"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteFilmBtn}
        sx={styles.deleteBtn}
        color="primary"
      >
        Delete Film
      </Button>
    </Paper>
  );
}
