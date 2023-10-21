import {configureStore} from "@reduxjs/toolkit";
import {authApi, authReducer} from "./auth";
import {usersReducer} from "./users";
import {chatsApi, chatsReducer} from "./chats";
import {photosApi} from "./photos";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    chats: chatsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
});