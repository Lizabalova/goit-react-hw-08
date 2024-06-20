import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { contactReducer} from "./contacts/slice";
import { filterReducer } from "./filters/slice";
import  authReducer  from "./auth/slice";
import { modalReducer } from "./modal/slice";

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
 

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filters: filterReducer,
    auth: persistedAuthReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)