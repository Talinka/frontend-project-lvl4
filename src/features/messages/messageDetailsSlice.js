/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import { addMessageStart, addMessageFailure, addMessageSuccess } from './messagesSlice';

const messageDetailsSlice = createSlice({
  name: 'messageDetails',
  initialState: { adding: false, error: null },
  reducers: {},
  extraReducers: {
    [addMessageStart]: (state) => {
      state.adding = true;
      state.error = null;
    },
    [addMessageSuccess]: (state) => {
      state.adding = false;
      state.error = null;
    },
    [addMessageFailure]: (state, action) => {
      state.adding = false;
      state.error = action.payload;
    },
  },
});

export default messageDetailsSlice.reducer;
