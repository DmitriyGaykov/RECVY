import {configureStore} from "@reduxjs/toolkit";
import {usersApi, usersReducer} from "./users";

export const store = configureStore({
  reducer: {
    users: [usersReducer],
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
});