import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NavState = {
  key: string;
  channel?: string;
};

const initialState: NavState = {
  key: "home",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNav: (state, action: PayloadAction<NavState>) => {
      state.key = action.payload.key;
      state.channel = action.payload.channel;
    },
  },
});

export const { setNav } = navigationSlice.actions;

export default navigationSlice.reducer;
