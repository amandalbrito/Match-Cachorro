// src/screens/slices/currentDogSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iList } from '../../home/home';

interface CurrentDogState {
  currentDog: iList | null;
}

const initialState: CurrentDogState = {
  currentDog: null,
};

const currentDogSlice = createSlice({
  name: 'currentDog',
  initialState,
  reducers: {
    selectDog: (state, action: PayloadAction<iList>) => {
      state.currentDog = action.payload;
    },
    clearDog: (state) => {
      state.currentDog = null;
    },
  },
});

export const { selectDog, clearDog } = currentDogSlice.actions;
export default currentDogSlice.reducer;