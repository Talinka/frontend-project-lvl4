import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage(state, action) {
      const newMessage = action.payload;
      state.push(newMessage);
    },
  },
});

export const {
  newMessage,
} = messagesSlice.actions;

export const addMessage = (text, username, channelId) => async (dispatch) => {
  const response = await axios.post(routes.channelMessagesPath(channelId), {
    data: {
      attributes: {
        body: text,
        username,
      },
    },
  });
  dispatch(newMessage(response.data));
};


export default messagesSlice.reducer;
