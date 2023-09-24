import { createSlice } from "@reduxjs/toolkit";

const sliceFavourites = createSlice({
  name: "favouritesId",
  initialState: [],
  reducers: {
    addToFavouriteCoinId: (state, action) => {
      return [...state, action.payload]; // Create a new array with the new item
    },
    removeFavouriteCoinId: (state, action) => {
      return state.filter((item) => item !== action.payload);
    }
  },
});

export const { addToFavouriteCoinId, removeFavouriteCoinId } =
  sliceFavourites.actions;
export default sliceFavourites.reducer;
