import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useState } from "react";
import { AddFilmModalProps } from "types/films.interface";
import { style } from "./AddFilmModal.styles";
import { Film } from "types/films.interface";
import { useDispatch } from "react-redux";
import { addFilm } from "features/films/filmsSlice";

type FilmFormat = "VHS" | "DVD" | "Blu-ray";

export const AddFilmModal: FC<AddFilmModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [format, setFormat] = useState<FilmFormat>("VHS");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [stars, setStars] = useState("");

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as FilmFormat);
  };

  const handleAddFilmBtn = () => {
    const newFilm: Film = {
      id: Date.now(),
      title,
      releaseYear: Number(year),
      format,
      stars: stars.split(",").map((star) => star.trim()),
    };

    if (title.slice() === "" || year.slice() === "" || stars.slice() === "")
      return;
    dispatch(addFilm(newFilm));
    setTitle("");
    setYear("");
    setFormat("VHS");
    setStars("");

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style.modal}>
        <Typography variant="h6" component="h2">
          Add New Film
        </Typography>
        <IconButton
          onClick={onClose}
          sx={style.icon}
          aria-label="close"
          size="small"
        >
          {" "}
          <CloseIcon></CloseIcon>
        </IconButton>
        <Stack spacing={2} mt={1}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            fullWidth
          />
          <TextField
            onChange={(e) => setYear(e.target.value)}
            label="Release Year"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Format</InputLabel>
            <Select label="Format" value={format} onChange={handleFormatChange}>
              <MenuItem value="VHS">VHS</MenuItem>
              <MenuItem value="DVD">DVD</MenuItem>
              <MenuItem value="Blu-ray">Blu-ray</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setStars(e.target.value)}
            label="Actors (comma separated)"
            fullWidth
          />
        </Stack>
        <Button
          onClick={handleAddFilmBtn}
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
};
