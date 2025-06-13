import { Typography, Box } from "@mui/material";
import FilmCard from "components/filmCard/FilmCard";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import SearchInput from "components/search-input/SearchInput";
import { useState } from "react";
import { styles } from "./Films.List.styles";
import AddFilmBtn from "components/addFilm/AddFilmBtn";

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

  const sortedResults = [...filteredResults].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return (
    <>
      <Box sx={styles.topBar}>
        <SearchInput onSearch={setSearchQuery} />
        <AddFilmBtn />
      </Box>

      {hasResults ? (
        <Box sx={styles.cardsContainer}>
          {sortedResults.map((film) => (
            <Box key={film.id} sx={styles.cardItem}>
              <FilmCard film={film} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={styles.noResultsText}>
          <Typography variant="h6" color="text.secondary" align="center">
            There are no movies for the following query "{searchQuery}"
          </Typography>
        </Box>
      )}
    </>
  );
}
