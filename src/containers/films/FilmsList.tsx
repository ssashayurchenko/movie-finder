import { Typography, Box } from "@mui/material";
import FilmCard from "components/film-card/FilmCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import SearchInput from "components/search-input/SearchInput";
import { useEffect, useState } from "react";
import { styles } from "./Films.List.styles";
import AddFilmBtn from "components/add-film/AddFilmBtn";
import { fetchFilms } from "features/films/filmsSlice";

export default function FilmsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { films } = useSelector((state: RootState) => state.films);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      fetchFilms({
        search: searchQuery,
        sort: "title",
        order: "ASC",
        limit: 50,
        offset: 0,
      })
    );
  }, [dispatch, searchQuery]);

  return (
    <>
      <Box sx={styles.topBar}>
        <SearchInput onSearch={setSearchQuery} />
        <AddFilmBtn />
      </Box>

      {films.length > 0 ? (
        <Box sx={styles.cardsContainer}>
          {films.map((film) => (
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
