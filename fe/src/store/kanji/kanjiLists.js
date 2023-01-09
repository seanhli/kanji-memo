//for storing pre-arranged lists of kanji for each difficulty level
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kanjiLists: {
    beginner: [],
    intermediate: [],
    advanced: [],
  },
  Qs: {
    beginner: ['abc'],
    intermediate: [],
    advanced: [],
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
    },
    // add method to remove all first item from queue (and if queue has less than 10 words, recreate a new shuffled queue)
    nextKanji: (state, action) => {
      // action payload should come in as list name
      if (action && action.payload in state.Qs)
          if (state.Qs[action.payload].length > 10) {
              state.Qs[action.payload].shift()
          } else {
              state.Qs[action.payload] = [...state.kanjiLists[action.payload]].sort((a, b) => 0.5 - Math.random())
          }
    },
  },
});


// Export our actions for use in our components
export const { createKanjiLists, nextKanji } = kanjiSlice.actions

// Export the reducer to use in the declaration of our store in store.js
export default kanjiSlice.reducer
