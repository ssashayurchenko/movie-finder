import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "types/films.interface";
import { FilmsState } from "types/films.interface";

const initialState: FilmsState = {
  films: [
    {
      id: 1,
      title: "Blazing Saddles",
      releaseYear: 1974,
      format: "VHS",
      stars: [
        "Mel Brooks",
        "Clevon Little",
        "Harvey Korman",
        "Gene Wilder",
        "Slim Pickens",
        "Madeline Kahn",
      ],
    },
    {
      id: 2,
      title: "Casablanca",
      releaseYear: 1942,
      format: "DVD",
      stars: [
        "Humphrey Bogart",
        "Ingrid Bergman",
        "Claude Rains",
        "Peter Lorre",
      ],
    },
    {
      id: 3,
      title: "Charade",
      releaseYear: 1953,
      format: "DVD",
      stars: [
        "Audrey Hepburn",
        "Cary Grant",
        "Walter Matthau",
        "James Coburn",
        "George Kennedy",
      ],
    },
  ],
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
