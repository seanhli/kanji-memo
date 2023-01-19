import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { kanjiAPI } from "./kanjiAPI";
import kanjiReducer from "./kanji/kanjiLists";
import menuReducer from "./menu/menuUI";
import trackingReducer from "./tracker/tracking";
import vocabReducer from "./kanji/vocabLists";

export const store = configureStore({
  reducer: {
    [kanjiAPI.reducerPath]: kanjiAPI.reducer,
    kanjiSlice: kanjiReducer,
    menuSlice: menuReducer,
    trackingSlice: trackingReducer,
    vocabSlice: vocabReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kanjiAPI.middleware),
});

setupListeners(store.dispatch);
