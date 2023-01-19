//for storing pre-arranged lists of kanji for each difficulty level
import { createSlice } from "@reduxjs/toolkit";
import { n1 } from "../vocabLists/n1";
import { n2 } from "../vocabLists/n2";
import { n3 } from "../vocabLists/n3";
import { n4 } from "../vocabLists/n4";
import { n5 } from "../vocabLists/n5";

const initialState = {
  // objects
  vocabLists: {
    beginner: {},
    intermediate: {},
    advanced: {},
  },
  // array of kanji form vocab
  Qs: {
    beginner: [],
    intermediate: [],
    advanced: [],
  },
  // array: ("kanji", {reading: "", meaning: ""})
  next1ENJP: {
    beginner: null,
    intermediate: null,
    advanced: null,
  },
  answerPoolENJP: {
    beginner: null,
    intermediate: null,
    advanced: null,
  },
  next1JPEN: {
    beginner: null,
    intermediate: null,
    advanced: null,
  },
  answerPoolJPEN: {
    beginner: null,
    intermediate: null,
    advanced: null,
  },
};

// Create the slice of data for managing lists of kanji to use for varying difficulty levels
export const vocabSlice = createSlice({
  name: "vocabSlice",
  initialState, // Set the initial state declared above
  reducers: {
    // no need for payload
    createVocabLists: (state, action) => {
      state.vocabLists["beginner"] = Object.assign(Object.assign({}, n5), n4);
      state.vocabLists["intermediate"] = Object.assign(
        Object.assign({}, n3),
        n2
      );
      state.vocabLists["advanced"] = n1;

      //Convert vocab objects to arrays and shuffle all lists and add to Qs
      state.Qs["beginner"] = Object.keys(state.vocabLists["beginner"]).sort(
        (a, b) => 0.5 - Math.random()
      );
      state.Qs["intermediate"] = Object.keys(
        state.vocabLists["intermediate"]
      ).sort((a, b) => 0.5 - Math.random());
      state.Qs["advanced"] = Object.keys(state.vocabLists["advanced"]).sort(
        (a, b) => 0.5 - Math.random()
      );

      //populate next1 and answer pool
      const levels = ["beginner", "intermediate", "advanced"];
      levels.forEach((level) => {
        const nextVocab = state.Qs[level].shift();

        //EN to JP
        state.next1ENJP[level] = [
          nextVocab,
          state.vocabLists[level][nextVocab],
        ];
        state.answerPoolENJP[level] = state.Qs[level]
          .splice(0, 8)
          .concat([nextVocab])
          .sort((a, b) => 0.5 - Math.random());

        //JP to EN
        state.next1JPEN[level] = [
          nextVocab,
          state.vocabLists[level][nextVocab],
        ];
        state.answerPoolJPEN[level] = state.Qs[level]
          .splice(0, 8)
          .concat([nextVocab])
          .map((jpvocab) => state.vocabLists[level][jpvocab]["meaning"])
          .sort((a, b) => 0.5 - Math.random());
      });
    },

    nextENJPVocab: (state, action) => {
      // action payload should come in as the difficulty level
      if (action && action.payload in state.Qs)
        if (state.Qs[action.payload].length < 40) {
          // replenish and shuffle queue if less than 40 words remaining in corresponding queue
          state.Qs[action.payload] = Object.keys(
            state.vocabLists[action.payload]
          ).sort((a, b) => 0.5 - Math.random());
        }
      // update next1 and answer pool states for corresponding level
      const nextItem = state.Qs[action.payload].shift();
      state.next1ENJP[action.payload] = [
        nextItem,
        state.vocabLists[action.payload][nextItem],
      ];
      state.answerPoolENJP[action.payload] = state.Qs[action.payload]
        .splice(0, 8)
        .concat([nextItem])
        .sort((a, b) => 0.5 - Math.random());
    },

    nextJPENVocab: (state, action) => {
      // action payload should come in as the difficulty level
      if (action && action.payload in state.Qs)
        if (state.Qs[action.payload].length < 40) {
          // replenish and shuffle queue if less than 40 words remaining in corresponding queue
          state.Qs[action.payload] = Object.keys(
            state.vocabLists[action.payload]
          ).sort((a, b) => 0.5 - Math.random());
        }
      // update next1 and answer pool states for corresponding level
      const nextItem = state.Qs[action.payload].shift();
      state.next1JPEN[action.payload] = [
        nextItem,
        state.vocabLists[action.payload][nextItem],
      ];
      state.answerPoolJPEN[action.payload] = state.Qs[action.payload]
        .splice(0, 8)
        .concat([nextItem])
        .map((jpvocab) => state.vocabLists[action.payload][jpvocab]["meaning"])
        .sort((a, b) => 0.5 - Math.random());
    },
  },
});

// Export our actions for use in our components
export const { createVocabLists, nextENJPVocab, nextJPENVocab } =
  vocabSlice.actions;

// Export the reducer to use in the declaration of our store in store.js
export default vocabSlice.reducer;
