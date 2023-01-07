import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const kanjiAPI = createApi({
    reducerPath: 'kanji',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kanjiapi.dev/v1/'
    }),
    endpoints: builder => ({
        //methods for api interaction
        //get all joyo kanji
        getJoyoKanji: builder.query({
            query: () => 'kanji/joyo'
        }),
        //get details for a specific kanji
        getKanjiDetail: builder.query({
            query: (character) => 'kanji/' + character
        })
    })
})

//export hooks for functionality set with endpoints
export const { useGetJoyoKanjiQuery, useGetKanjiDetailQuery } = kanjiAPI
