import FilmsList from "containers/films/FilmsList";
import AddFilmBtn from "components/addFilm/AddFilmBtn";
import SearchInput from "components/search-input/SearchInput";
export default function App() {
  return (
    <>
      <SearchInput />
      <FilmsList />
      <AddFilmBtn />
    </>
  );
}
