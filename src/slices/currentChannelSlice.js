import { createSlice } from '@reduxjs/toolkit';
import { removeChannelSuccess } from './channelsSlice';

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: 1,
  reducers: {
    changeCurrentChannel(state, action) {
      return action.payload;
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, action) => (
      (state === action.payload) ? 1 : state
    ),
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
