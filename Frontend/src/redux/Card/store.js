import { configureStore,combineReducers } from "@reduxjs/toolkit";
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
import cardReducer from "./cardSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};



const rootReducer = combineReducers({ user: cardReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store2 = configureStore({
  reducer: { cardReducer: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor2 = persistStore(store2);