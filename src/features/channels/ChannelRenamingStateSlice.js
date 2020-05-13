/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import { renameChannelStart, renameChannelSuccess, renameChannelFailure } from './channelsSlice';

const channelrenamingStateSlice = createSlice({
  name: 'channelrenamingState',
  initialState: { renaming: false, error: null },
  reducers: {},
  extraReducers: {
    [renameChannelStart]: (state) => {
      state.renaming = true;
      state.error = null;
    },
    [renameChannelSuccess]: (state) => {
      state.renaming = false;
      state.error = null;
    },
    [renameChannelFailure]: (state, action) => {
      state.renaming = false;
      state.error = action.payload;
    },
  },
});

export default channelrenamingStateSlice.reducer;
