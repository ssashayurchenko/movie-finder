export interface Film {
  id: number;
  title: string;
  year: number;
  format: "VHS" | "DVD" | "Blu-ray";
  actors: string[];
}

export interface FilmsState {
  films: Film[];
  selectedFilm: FilmInfo | null;
}

export interface Actor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface FilmInfo {
  title: string;
  actors: Actor[];
}

export interface AddFilmModalProps {
  open: boolean;
  onClose: () => void;
  onFilmAdded?: () => void;
  existingFilms: Film[];
}

export interface FetchFilmsParams {
  search?: string;
  sort?: string;
  order?: "ASC" | "DESC";
  limit?: number;
  offset?: number;
}
