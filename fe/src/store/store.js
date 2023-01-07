import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { kanjiAPI } from './kanjiAPI'

export const store = configureStore({
    reducer: {
        [kanjiAPI.reducerPath]: kanjiAPI.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(kanjiAPI.middleware),
})

setupListeners(store.dispatch)
