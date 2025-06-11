export interface Film {
  id: number;
  title: string;
  releaseYear: number;
  format: "VHS" | "DVD" | "Blu-ray";
  stars: string[];
}

export interface FilmsState {
  films: Film[];
}

export interface AddFilmModalProps {
  open: boolean;
  onClose: () => void;
}
