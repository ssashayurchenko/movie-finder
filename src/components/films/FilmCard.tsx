import { Film } from "types/films.interface";
import { Box, Typography, Paper, Stack } from "@mui/material";

export default function FilmCard() {
  const mockedData: Film[] = [
    {
      id: 1,
      title: "Blazing Saddles",
      releaseYear: 1974,
      format: "VHS",
      stars: [
        "Mel Brooks",
        "Clevon Little",
        "Harvey Korman",
        "Gene Wilder",
        "Slim Pickens",
        "Madeline Kahn",
      ],
    },
    {
      id: 2,
      title: "Casablanca",
      releaseYear: 1942,
      format: "DVD",
      stars: [
        "Humphrey Bogart",
        "Ingrid Bergman",
        "Claude Rains",
        "Peter Lorre",
      ],
    },
    {
      id: 3,
      title: "Charade",
      releaseYear: 1953,
      format: "DVD",
      stars: [
        "Audrey Hepburn",
        "Cary Grant",
        "Walter Matthau",
        "James Coburn",
        "George Kennedy",
      ],
    },
  ];

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {mockedData.map((film) => (
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
      ))}
    </Stack>
  );
}
