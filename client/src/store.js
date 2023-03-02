import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/users/usersSlice";
import postReducer from "./features/posts/postsSlice";
import authReducer from "./features/auth/authSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PURGE,
  PERSIST,
  PAUSE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authpersistConfig = { key: "auth", storage, version: 1 };
const userpersistConfig = { key: "user", storage, version: 1 };
const postpersistConfig = { key: "post", storage, version: 1 };
const authpersisted = persistReducer(authpersistConfig, authReducer);
const postpersisted = persistReducer(postpersistConfig, postReducer);
const userpersisted = persistReducer(userpersistConfig, usersReducer);

const store = configureStore({
  reducer: {
    auth: authpersisted,
    posts: postpersisted,
    users: userpersisted,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PURGE, PERSIST, PAUSE, REGISTER],
      },
    }),
});

export default store;
