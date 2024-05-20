import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Theme {
  mode: string;
}

const initialState: Theme = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode === 'light' ? (state.mode = 'dark') : (state.mode = 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const getTheme = (state: RootState) => state.theme.mode;
export default themeSlice.reducer;
