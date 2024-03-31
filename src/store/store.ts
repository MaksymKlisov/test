import { configureStore } from '@reduxjs/toolkit'
import usersApi from "../entities/users/api/usersApi.ts";

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        usersApi.middleware,
    ])
})
export type RootState = ReturnType<typeof store.getState>

export default store