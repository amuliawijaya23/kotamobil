import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import { ThemeRegistry } from './theme/ThemeRegistry.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeRegistry>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </ThemeRegistry>
    </Provider>
  </React.StrictMode>,
);
