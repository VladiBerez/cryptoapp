import { createSlice } from "@reduxjs/toolkit";

const sliceFavouritesCoinsFullInfo = createSlice({
    name: 'favouritesCoinFullInfo',
    initialState: [],
    reducers:
    {
        pushToFavouriteCoinFull: (state, action) => {
        return [...state, action.payload];
      },
      deleteFromFavouriteCoinFull: (state, action) => {
        return state.filter((item) => item.uuid !== action.payload.uuid);
    }}
})

export const {pushToFavouriteCoinFull, deleteFromFavouriteCoinFull} = sliceFavouritesCoinsFullInfo.actions;
export default sliceFavouritesCoinsFullInfo.reducer;