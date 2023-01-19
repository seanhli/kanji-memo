import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beginner: {
    total: 0,
    correct: 0,
  },
  intermediate: {
    total: 0,
    correct: 0,
  },
  advanced: {
    total: 0,
    correct: 0,
  },
};

export const trackingSlice = createSlice({
  name: "trackingSlice",
  initialState, // Set the initial state declared above
  reducers: {
    updateScore: (state, action) => {
      // action payload should be an array [difficulty, a 1 or 0 (1 for correct, 0 for not)]
      state[action.payload[0]]["total"] += 1;
      state[action.payload[0]]["correct"] += action.payload[1];
    },
  },
});

// Export our actions for use in our components
export const { updateScore } = trackingSlice.actions;

// Export the reducer to use in the declaration of our store in store.js
export default trackingSlice.reducer;
