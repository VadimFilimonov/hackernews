import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { store } from './slices';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
