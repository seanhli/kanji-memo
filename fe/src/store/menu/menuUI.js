import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modes: true,
  difficulty: true,
};

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState, // Set the initial state declared above
  reducers: {
    toggleMenu: (state, action) => {
      // action payload should come in for which menu
      if (action.payload in state) {
        state[action.payload] = !state[action.payload]
      }
    },
  },
});

// Export our actions for use in our components
export const { toggleMenu } = menuSlice.actions;

// Export the reducer to use in the declaration of our store in store.js
export default menuSlice.reducer;
