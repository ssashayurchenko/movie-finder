import { Stack } from "@mui/material";
import FilmCard from "components/filmCard/FilmCard";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

export default function FilmsList() {
  const films = useSelector((state: RootState) => state.films.films);
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </Stack>
  );
}
