/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchStories = createAsyncThunk('stories/fetchStories', api.fetchStories);
export const fetchStory = createAsyncThunk('stories/fetchStory', api.fetchStory);

const storiesAdapter = createEntityAdapter();

const initialState = storiesAdapter.getInitialState({ status: 'idle', error: null });

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, { payload }) => {
        state.entities = payload.reduce((acc, current) => ({ ...acc, [current.id]: current }), {});
        state.ids = payload.map(({ id }) => id);
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchStory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStory.fulfilled, (state, { payload }) => {
        storiesAdapter.addOne(state, payload);
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const selectors = storiesAdapter.getSelectors((state) => state.stories);
export default storiesSlice.reducer;
