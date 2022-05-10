/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './storiesSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
});
