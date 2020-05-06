import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: 0,
  reducers: {
    changeCurrentChannel(state, action) {
      return action.payload;
    },
  },
});

export const { changeCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
