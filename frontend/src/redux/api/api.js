import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import qs from "qs";
import { SERVER_PATH } from './apiConsts';

// import { createApi } from '@reduxjs/toolkit/query/react'
// import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const api = createApi({
    reducerPath: "api",
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: SERVER_PATH,
            paramsSerializer: function (params) {
                return qs.stringify(params, {
                    arrayFormat: "repeat",
                    skipNulls: true,
                });
            },
            // prepareheaders: (headers, { getstate }) => {
            //     const token = (getstate() as rootstate).auth.token;
            //     if (token) {
            //       headers.set("authorization", `bearer ${token}`);
            //     }
            //     return headers;
            //   },
        }),
        { maxRetries: 2 }
    ),
    endpoints: () => ({}),
});
