import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import sliceFavourites from "../redux/slices/sliceFavourites";
import sliceFavouritesCoins from "../redux/slices/sliceFavouritesCoins";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    favouritesId: sliceFavourites,
    favouritesCoin: sliceFavouritesCoins,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
