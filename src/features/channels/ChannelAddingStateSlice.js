/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import { addChannelStart, addChannelSuccess, addChannelFailure } from './channelsSlice';

const channelAddingStateSlice = createSlice({
  name: 'channelAddingState',
  initialState: { adding: false, error: null },
  reducers: {},
  extraReducers: {
    [addChannelStart]: (state) => {
      state.adding = true;
      state.error = null;
    },
    [addChannelSuccess]: (state) => {
      state.adding = false;
      state.error = null;
    },
    [addChannelFailure]: (state, action) => {
      state.adding = false;
      state.error = action.payload;
    },
  },
});

export default channelAddingStateSlice.reducer;
