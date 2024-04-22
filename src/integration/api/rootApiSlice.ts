import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

const BASE_URL = 'http://localhost:8000/api/';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials:"include",
    prepareHeaders: (headers, { getState }) => {
        const { auth: {token}} = getState() as RootState;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult:any = await baseQuery('user/auth/refresh', api, extraOptions);
        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data.accessToken))
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut(null));
        }
    }
    return result;
};

export const rootApiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    tagTypes:["files"],
    endpoints: () => ({})
})