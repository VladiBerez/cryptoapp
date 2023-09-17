import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
<<<<<<< Updated upstream
import sliceFavourites from "../redux/slices/sliceFavourites";
=======
>>>>>>> Stashed changes

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    favourites: sliceFavourites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
