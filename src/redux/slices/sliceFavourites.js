import { createSlice } from "@reduxjs/toolkit";

const sliceFavourites = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addToFavouriteCoin: (state, action) => {
      return [...state, action.payload]; // Create a new array with the new item
    },
    removeFavouriteCoin: (state, action) => {
      return state.filter((item) => item !== action.payload);
    },
  },
});

export const { addToFavouriteCoin, removeFavouriteCoin } =
  sliceFavourites.actions;
export default sliceFavourites.reducer;
