import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    newMessage(state, action) {
      const { attributes } = action.payload;
      state.push(attributes);
    },
    addMessageSuccess(state, action) {
      const newMessage = action.payload;
      state.push(newMessage);
    },
  },
});

export const {
  addMessageStart = createAction('addMessageStart'),
  addMessageSuccess,
  addMessageFailure = createAction('addMessageFailure'),
  newMessage,
} = messagesSlice.actions;

export const addMessage = (text, username, channelId) => async (dispatch) => {
  dispatch(addMessageStart());
  try {
    const response = await axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: {
          body: text,
          username,
        },
      },
    });
    dispatch(addMessageSuccess(response.data));
  } catch (error) {
    dispatch(addMessageFailure(error.message));
    throw (error);
  }
};


export default messagesSlice.reducer;
