import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { kanjiAPI } from './kanjiAPI'
import kanjiReducer from './kanji/kanjiLists'

export const store = configureStore({
    reducer: {
        [kanjiAPI.reducerPath]: kanjiAPI.reducer,
        kanjiSlice: kanjiReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(kanjiAPI.middleware),
})

setupListeners(store.dispatch)
