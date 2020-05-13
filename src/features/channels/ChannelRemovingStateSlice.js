/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import { removeChannelStart, removeChannelSuccess, removeChannelFailure } from './channelsSlice';

const channelremovingStateSlice = createSlice({
  name: 'channelremovingState',
  initialState: { removing: false, error: null },
  reducers: {},
  extraReducers: {
    [removeChannelStart]: (state) => {
      state.removing = true;
      state.error = null;
    },
    [removeChannelSuccess]: (state) => {
      state.removing = false;
      state.error = null;
    },
    [removeChannelFailure]: (state, action) => {
      state.removing = false;
      state.error = action.payload;
    },
  },
});

export default channelremovingStateSlice.reducer;
