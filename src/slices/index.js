/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './commentsSlice';
import storiesReducer from './storiesSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    stories: storiesReducer,
  },
});
