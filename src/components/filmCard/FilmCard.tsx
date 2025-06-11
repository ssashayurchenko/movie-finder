import { Film } from "types/films.interface";
import { Box, Typography, Paper, Stack } from "@mui/material";

type FilmCardProps = {
  film: Film;
};

export default function FilmCard({ film }: FilmCardProps) {
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
    </Paper>
  );
}
