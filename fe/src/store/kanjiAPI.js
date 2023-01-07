import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const kanjiAPI = createApi({
    reducerPath: 'kanjiAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kanjiapi.dev/v1/'
    }),
    endpoints: builder => ({
        //methods for api interaction
        //get grade N (1-6) kanji
        getGradeNKaji: builder.query({
            query: (level) => 'kanji/grade-' + level
        }),
        //get all joyo (all - will use as advanced for now) kanji
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
export const { useGetGradeNKajiQuery, useGetJoyoKanjiQuery, useGetKanjiDetailQuery } = kanjiAPI
