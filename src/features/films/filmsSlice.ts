import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film, FilmsState, FetchFilmsParams } from "types/films.interface";

const apiUrl = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const headers = {
  Authorization: ACCESS_TOKEN,
};

export type NewFilm = Omit<Film, "id">;

export const fetchFilms = createAsyncThunk<
  Film[],
  FetchFilmsParams | undefined
>("movies/fetchFilms", async (params) => {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.sort) query.append("sort", params.sort);
  if (params?.order) query.append("order", params.order);
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.offset) query.append("offset", params.offset.toString());

  const response = await fetch(`${apiUrl}/movies?${query.toString()}`, {
    headers,
  });
  const data = await response.json();
  return data.data;
});

export const createFilm = createAsyncThunk<Film, NewFilm>(
  "movies/createFilm",
  async (newFilmData) => {
    const response = await fetch(`${apiUrl}/movies`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilmData),
    });

    if (!response.ok) throw new Error("Failed to add the film");

    const data = await response.json();
    return data.data;
  }
);

export const createFilmAndReload = createAsyncThunk<void, NewFilm>(
  "movies/createFilmAndReload",
  async (newFilmData, { dispatch }) => {
    await dispatch(createFilm(newFilmData)).unwrap();
    await dispatch(fetchFilms());
  }
);

export const deleteFilm = createAsyncThunk<number, number>(
  "movies/deleteFilm",
  async (filmId) => {
    const response = await fetch(`${apiUrl}/movies/${filmId}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) throw new Error("Failed to delete the film");

    return filmId;
  }
);

export const fetchFilmById = createAsyncThunk<Film, number>(
  "movies/fetchFilmById",
  async (filmId) => {
    const response = await fetch(`${apiUrl}/movies/${filmId}`, {
      headers,
    });

    if (!response.ok) throw new Error("Failed to fetch film details");

    const data = await response.json();
    return data.data;
  }
);

const initialState: FilmsState = {
  films: [],
  selectedFilm: null,
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    clearSelectedFilm(state) {
      state.selectedFilm = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
      })
      .addCase(deleteFilm.fulfilled, (state, action) => {
        state.films = state.films.filter((film) => film.id !== action.payload);
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.selectedFilm = action.payload;
      });
  },
});

export const { clearSelectedFilm } = filmsSlice.actions;

export default filmsSlice.reducer;
