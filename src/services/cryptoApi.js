// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const cryptoApiHeaders = {
//   "X-RapidAPI-Key": "27c464b7c8msh887bcc6d53ef052p16b625jsn634ef3bb02ec",
//   "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
// };

// const baseUrl = "https://coinranking1.p.rapidapi.com";
// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getCrypto: builder.query({
//       query: () =>
//         createRequest(
//           "/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0"
//         ),
//     }),
//   }),
// });

// export const { useGetCryptoQuery } = cryptoApi;

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
    }),
    getCoin: builder.query({
      query: () =>
        createRequest(
          "/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h"
        ),
    }),
  }),
});

export const { useGetCoinsQuery, useGetCoinQuery } = cryptoApi;
