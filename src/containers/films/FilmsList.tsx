import { Stack, Typography } from "@mui/material";
import FilmCard from "components/filmCard/FilmCard";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import SearchInput from "components/search-input/SearchInput";
import { useState } from "react";

export default function FilmsList() {
  const films = useSelector((state: RootState) => state.films.films);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = films.filter(
    (film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.stars.some((star) =>
        star.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
  const hasResults = searchQuery ? filteredResults.length > 0 : true;
  return (
    <>
      <SearchInput onSearch={setSearchQuery} />
      <Stack spacing={2} sx={{ p: 2 }}>
        {hasResults ? (
          (searchQuery ? filteredResults : films).map((film) => (
            <FilmCard key={film.id} film={film} />
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" align="center">
            There are no movies for the following query "{searchQuery}"
          </Typography>
        )}
      </Stack>
    </>
  );
}
