/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

export const fetchComments = createAsyncThunk('comments/fetchComments', api.fetchComments);
export const fetchItem = createAsyncThunk('comments/fetchItem', api.fetchItem);

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({ status: 'idle', error: null });

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.entities = {};
      state.ids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        commentsAdapter.addMany(state, payload);
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, { payload }) => {
        commentsAdapter.addOne(state, payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export default commentsSlice.reducer;
