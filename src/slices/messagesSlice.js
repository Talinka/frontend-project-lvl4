import { createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { removeChannelSuccess } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage(state, action) {
      const newMessage = action.payload;
      state.push(newMessage);
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, action) => {
      const id = action.payload;
      return state.filter(({ channelId }) => channelId !== id);
    },
  },
});

export const {
  newMessage,
} = messagesSlice.actions;

export const addMessage = (text, username, channelId) => (
  axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: {
        body: text,
        username,
      },
    },
  })
);

export const selectMessages = (state) => state.messages;
const selectCurrentChannelId = (state) => state.currentChannelId;

export const selectCurrentMessages = createSelector(
  selectMessages,
  selectCurrentChannelId,
  (messages, currentChannelId) => messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  ),
);

export default messagesSlice.reducer;
