import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const apiCryptoHeaders = {
  "X-RapidAPI-Key": "27c464b7c8msh887bcc6d53ef052p16b625jsn634ef3bb02ec",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const createRequest = (url) => ({ url, headers: apiCryptoHeaders });

const urlCoins = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: urlCoins }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) =>
        createRequest(
          `/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${count}&offset=0`
        ),
      providesTags: ["Coins"],
      ttl: 3600,
    }),
    getCryptoDetails: builder.query({
      query: (uuid) => createRequest(`/coin/${uuid}`),
      provdesTags: ["CoinId"],
      ttl: 3600,
    }),
    getExchanges: builder.query({
      query: (coin) => createRequest(`/coin/${coin}/exchanges`),
      providesTags: ["CoinExchanges"],
      ttl: 3600,
    }),
    // addToFavourites: builder.mutation({
    //   query: (currencyId) => ({
    //     url: `favourites/${currencyId}`,
    //     method: "POST",
    //   }),
    //   onMutate: (currencyId) => {
    //     dispatchAddToFavouriteCoin(currencyId);
    //   },
    // }),
    // removeFavourites: builder.mutation({
    //   query: (currencyId) => ({
    //     url: `favourites/${currencyId}`,
    //     method: "DELETE",
    //   }),
    //   onMutate: (currencyId) => {
    //     dispatchRemoveFavouriteCoin(currencyId);
    //   },
    // }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  // useAddToFavouritesMutation,
  // useRemoveFavouritesMutation,
} = cryptoApi;
