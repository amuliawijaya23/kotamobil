import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const LC_USER_THEME = 'LC_USER_THEME';

export interface Theme {
  mode: 'dark' | 'light';
}

const initialState: Theme = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode === 'light' ? (state.mode = 'dark') : (state.mode = 'light');
      localStorage.setItem(LC_USER_THEME, state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const getTheme = (state: RootState) => state.theme.mode;
export default themeSlice.reducer;
