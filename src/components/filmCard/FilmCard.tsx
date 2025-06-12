import { Film } from "types/films.interface";
import { Box, Typography, Paper, Button } from "@mui/material";
import { deleteFilm } from "features/films/filmsSlice";
import { useDispatch } from "react-redux";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
  const dispatch = useDispatch();
  const handleDeleteFilmBtn = () => {
    dispatch(deleteFilm(film.id));
  };
  return (
    <Paper key={film.id} elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" component="h2">
        {film.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Format: {film.format}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Year: {film.releaseYear}
      </Typography>
      <Box mt={1}>
        <Typography variant="subtitle2">Stars:</Typography>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {film.stars.map((actor, index) => (
            <li key={index}>
              <Typography variant="body2">{actor}</Typography>
            </li>
          ))}
        </ul>
      </Box>
      <Button
        onClick={handleDeleteFilmBtn}
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
      >
        Delete Film
      </Button>
    </Paper>
  );
}
