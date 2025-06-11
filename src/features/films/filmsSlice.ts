import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "types/films.interface";
import { FilmsState } from "types/films.interface";

const initialState: FilmsState = {
  films: [],
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    addFilm: (state, action: PayloadAction<Film>) => {
      state.films.push(action.payload);
    },
  },
});

export const { addFilm } = filmsSlice.actions;
export default filmsSlice.reducer;