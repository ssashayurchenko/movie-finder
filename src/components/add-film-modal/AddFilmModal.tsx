import {
  Modal,
  Box,
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
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { FC, useState } from "react";
import { AddFilmModalProps } from "types/films.interface";
import { style } from "./AddFilmModal.styles";
import { Film } from "types/films.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store";
import { createFilmAndReload } from "features/films/filmsSlice";

type FilmFormat = "VHS" | "DVD" | "Blu-ray";

export const AddFilmModal: FC<
  AddFilmModalProps & { onFilmAdded?: () => void }
> = ({ open, onClose, onFilmAdded, existingFilms }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [format, setFormat] = useState<FilmFormat>("VHS");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    year: "",
    stars: "",
  });

  const titleValidate = /^[A-Za-z0-9 _.,!?'"()-]{1,100}$/;
  const yearValidate = /^\d{4}$/;
  const actorsValidate =
    /^([A-Za-z]+(\s[A-Za-z]+)?)(,\s?[A-Za-z]+(\s[A-Za-z]+)?)*$/;

  const validateTitle = (value: string): string => {
    if (!value.trim()) return "Title is required";
    if (!titleValidate.test(value)) return "Title contains invalid characters";
    const isDuplicate = existingFilms.some(
      (film) => film.title.toLowerCase() === value.trim().toLowerCase()
    );
    if (isDuplicate) return "Title must be unique";

    return "";
  };

  const validateYear = (value: string): string => {
    const year = Number(value);
    if (!value.trim()) return "Year is required";
    if (!yearValidate.test(value)) return "Year must be a 4-digit number";
    if (year < 1900 || year > 2021) return "Year must be between 1900 and 2021";
    return "";
  };

  const validateStars = (value: string): string => {
    if (!value.trim()) return "Actors are required";
    if (!actorsValidate.test(value))
      return "Actors must be comma-separated names";
    return "";
  };

  const validateFields = (): boolean => {
    const titleError = validateTitle(title);
    const yearError = validateYear(year);
    const starsError = validateStars(stars);

    setErrors({ title: titleError, year: yearError, stars: starsError });
    return !titleError && !yearError && !starsError;
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as FilmFormat);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setErrors((prev) => ({ ...prev, year: validateYear(value) }));
  };

  const handleStarsChange = (value: string) => {
    setStars(value);
    setErrors((prev) => ({ ...prev, stars: validateStars(value) }));
  };

  const handleAddFilmBtn = async () => {
    if (!validateFields()) return;

    const newFilm: Omit<Film, "id"> = {
      title,
      year: Number(year),
      format,
      actors: stars.split(",").map((star) => star.trim()),
    };

    try {
      await dispatch(createFilmAndReload(newFilm)).unwrap();

      setTitle("");
      setYear("");
      setFormat("VHS");
      setStars("");
      setErrors({ title: "", year: "", stars: "" });

      onClose();
      onFilmAdded?.();
    } catch (error) {
      console.error("Failed to add film and reload:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style.modal}>
        <IconButton
          onClick={onClose}
          sx={style.icon}
          aria-label="close"
          size="small"
        >
          <CloseIcon />
        </IconButton>
        <Stack spacing={2} mt={1}>
          <TextField
            onChange={(e) => handleTitleChange(e.target.value)}
            label="Title"
            value={title}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <TextField
            onChange={(e) => handleYearChange(e.target.value)}
            label="Release Year"
            value={year}
            error={!!errors.year}
            helperText={errors.year}
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
            onChange={(e) => handleStarsChange(e.target.value)}
            label="Actors (comma separated)"
            value={stars}
            error={!!errors.stars}
            helperText={errors.stars}
            fullWidth
          />
        </Stack>
        <Button
          onClick={handleAddFilmBtn}
          sx={{ mt: 2 }}
          variant="contained"
          color="primary"
          startIcon={<LibraryAddIcon />}
        >
          Save changes
        </Button>
      </Box>
    </Modal>
  );
};
