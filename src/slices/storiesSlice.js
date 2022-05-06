import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from '../routes';

const STORIES_COUNT_LIMIT = 100;

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async () => {
    const response = await fetch(routes.storiesPath());
    const ids = await response.json();
    const slicedIds = ids.slice(0, STORIES_COUNT_LIMIT);
    const stories = await Promise.all(slicedIds.map(async (id) => {
      const storyResponse = await fetch(routes.itemPath(id));
      const story = await storyResponse.json();
      return story;
    }));
    return stories;
  }
)

const initialState = {
  list: [],
  status: 'idle',
  error: null
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      });
  }
});

export default storiesSlice.reducer;