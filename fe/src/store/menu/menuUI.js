import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modes: true,
  difficulty: true,
  level: 1,
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
    changeLevel: (state, action) => {
      // action payload should indicate which level
      if (1 <= action.payload && action.payload <= 3) {
        state.level = action.payload
      }
    },
  },
});

// Export our actions for use in our components
export const { toggleMenu, changeLevel } = menuSlice.actions;

// Export the reducer to use in the declaration of our store in store.js
export default menuSlice.reducer;
