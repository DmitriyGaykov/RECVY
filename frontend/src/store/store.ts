import {configureStore} from "@reduxjs/toolkit";
import {authApi, authReducer} from "./auth";
import {usersApi, usersReducer} from "./users";
import {chatsApi, chatsReducer} from "./chats";
import {photosApi} from "./photos";
import {messageReducer, messagesApi} from "./messages";
import {stickersApi} from "./stickers";
import {audiosApi} from "./audios";
import {wsReducer} from "./ws";
import {subscribersApi, subscribersReducer} from "./subscribers";
import {friendsApi, friendsReducer} from "./friends";
import {adminApi} from "./admin";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    chats: chatsReducer,
    messages: messageReducer,
    ws: wsReducer,
    friends: friendsReducer,
    subscribers: subscribersReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [stickersApi.reducerPath]: stickersApi.reducer,
    [audiosApi.reducerPath]: audiosApi.reducer,
    [subscribersApi.reducerPath]: subscribersApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      authApi.middleware,
      usersApi.middleware,
      photosApi.middleware,
      chatsApi.middleware,
      messagesApi.middleware,
      stickersApi.middleware,
      audiosApi.middleware,
      subscribersApi.middleware,
      friendsApi.middleware,
      adminApi.middleware)
});