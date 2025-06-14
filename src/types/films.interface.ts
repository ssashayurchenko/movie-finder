export interface Film {
  id: number;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}

export interface FilmsState {
  films: Film[];
  selectedFilm: Film | null;
}

export interface AddFilmModalProps {
  open: boolean;
  onClose: () => void;
}

export interface FetchFilmsParams {
  search?: string;
  sort?: string;
  order?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
}
