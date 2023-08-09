import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryproHeadersNews = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "27c464b7c8msh887bcc6d53ef052p16b625jsn634ef3bb02ec",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrlNews = "https://bing-news-search1.p.rapidapi.com/news";

const createRequest = (url) => ({ url, headers: cryproHeadersNews });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlNews }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
