import { Modal, Typography, List, ListItem, Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { fetchFilmById, clearSelectedFilm } from "features/films/filmsSlice";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

type FilmModalProps = {
  filmId: number;
  open: boolean;
  close: () => void;
};

export default function FilmModal({ filmId, open, close }: FilmModalProps) {
  const dispatch = useAppDispatch();
  const film = useSelector((state: RootState) => state.films.selectedFilm);

  useEffect(() => {
    if (open) {
      dispatch(fetchFilmById(filmId));
    }

    return () => {
      dispatch(clearSelectedFilm());
    };
  }, [open, dispatch, filmId]);

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {film ? (
          <>
            <Typography variant="h6">{film.title}</Typography>
            <Typography variant="subtitle1">Stars:</Typography>
            <List>
              {film.actors?.map((actor) => (
                <ListItem key={actor.id}>
                  <Typography variant="body2">{actor.name}</Typography>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Modal>
  );
}
