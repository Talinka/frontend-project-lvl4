import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess(state, action) {
      const newChannel = action.payload;
      state.push(newChannel);
    },
    removeChannelSuccess(state, action) {
      const { id } = action.payload;
      return state.filter((channel) => channel.id !== id);
    },
    renameChannelSuccess(state, action) {
      const { attributes } = action.payload;
      const { id } = attributes;
      return state.map((channel) => (
        channel.id === id ? attributes : channel
      ));
    },
  },
});

export const {
  addChannelStart = createAction('addChannelStart'),
  addChannelSuccess,
  addChannelFailure = createAction('addChannelFailure'),
} = channelsSlice.actions;

export const addChannel = (name) => async (dispatch) => {
  dispatch(addChannelStart());
  try {
    const response = await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name,
        },
      },
    });
    const newChannelData = response.data;
    dispatch(addChannelSuccess(newChannelData));
  } catch (error) {
    console.error(`Can't create the channel. ${error.message}`);
    dispatch(addChannelFailure(error.message));
  }
};

export default channelsSlice.reducer;
