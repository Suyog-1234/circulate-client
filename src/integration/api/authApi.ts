import { logOut, setCredentials } from "../slices/authSlice"
import { rootApiSlice } from "./rootApiSlice"

export const authApiSlice = rootApiSlice.injectEndpoints({
    endpoints: builder => ({
         getMyAccount:builder.query<any,void>({
             query:()=>({
                 url:"user/auth/my-account",
                 method:"GET"
             })
         }),
        register: builder.mutation<any,{email:string,password:string,name:string}>({
            query: credentials => ({
                url: 'user/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        login: builder.mutation<any,{email:string,password:string}>({
            query: credentials => ({
                url: 'user/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.mutation<any,void>({
            query: () => ({
                url: 'user/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut(null))
                    setTimeout(() => {
                        dispatch(rootApiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: 'user/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    useRegisterMutation,
    useGetMyAccountQuery
} = authApiSlice 