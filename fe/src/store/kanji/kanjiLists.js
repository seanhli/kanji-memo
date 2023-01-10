//for storing pre-arranged lists of kanji for each difficulty level
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kanjiLists: {
    beginner: [],
    intermediate: [],
    advanced: [],
  },
  Qs: {
    beginner: [],
    intermediate: [],
    advanced: [],
  },
  next1: {
    beginner: null,
    intermediate: null,
    advanced: null,
  },
  next5: {
    beginner: null,
    intermediate: null,
    advanced: null,
  }
};

// Create the slice of data for managing lists of kanji to use for varying difficulty levels
export const kanjiSlice = createSlice({
  name: 'kanjiSlice',
  initialState, // Set the initial state declared above
  reducers: {
    // action.payload[0] = beginner list, action.payload[1] = intermediate list...
    createKanjiLists: (state, action) => {
      state.kanjiLists["beginner"] = action.payload[0]
      state.kanjiLists["intermediate"] = action.payload[1]
      state.kanjiLists["advanced"] = action.payload[2]

      //shuffle all lists and add to Qs
      state.Qs["beginner"] = [...action.payload[0]].sort((a, b) => 0.5 - Math.random())
      state.Qs["intermediate"] = [...action.payload[1]].sort((a, b) => 0.5 - Math.random())
      state.Qs["advanced"] = [...action.payload[2]].sort((a, b) => 0.5 - Math.random())

      //populate next1 and next5 states
      const levels = ["beginner","intermediate","advanced"]
      levels.forEach(level => {
        state.next1[level] = state.Qs[level].shift()
        state.next5[level] = state.Qs[level].splice(0,5)
      })
    },

    nextKanji: (state, action) => {
      // action payload should come in as list name
      if (action && action.payload in state.Qs)
        // replenish and shuffle queue if less than 10 words remaining in corresponding queue
        if (state.Qs[action.payload].length < 10) {
          state.Qs[action.payload] = [...state.kanjiLists[action.payload]].sort((a, b) => 0.5 - Math.random())
        }
        // update next1 and next5 states for corresponding level
        state.next1[action.payload] = state.Qs[action.payload].shift()
        state.next5[action.payload] = state.Qs[action.payload].splice(0,5)
    },
  },
});


// Export our actions for use in our components
export const { createKanjiLists, nextKanji } = kanjiSlice.actions

// Export the reducer to use in the declaration of our store in store.js
export default kanjiSlice.reducer
