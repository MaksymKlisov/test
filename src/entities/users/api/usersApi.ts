import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../model/Users.ts";



const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery(
        { baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser, { page?: number; count?: number }>({
            query: ({ page = 1, count = 6 }) => `users?page=${page}&count=${count}`,
        }),
    }),
})

export const {useGetUsersQuery} = usersApi
export default usersApi