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
    getCryptoDetails: builder.query({
      query: (uuid) =>
        createRequest(`https://coinranking1.p.rapidapi.com/coin/${uuid}`),
    }),
    getCryptoHistory: builder.query({
      query: (uuid, timePeriod) =>
        createRequest(
          `https://coinranking1.p.rapidapi.com/coin/${uuid}/history/${timePeriod}`
        ),
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
