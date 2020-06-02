/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess(state, action) {
      const { attributes } = action.payload;
      state.push(attributes);
    },
    removeChannelSuccess(state, action) {
      const id = action.payload;
      return state.filter((channel) => channel.id !== id);
    },
    renameChannelSuccess(state, action) {
      const modifiedChannel = action.payload;
      const index = state.findIndex((channel) => channel.id === modifiedChannel.id);
      state[index] = modifiedChannel;
    },
  },
});

export const {
  addChannelSuccess,
  removeChannelSuccess,
  renameChannelSuccess,
} = channelsSlice.actions;

export const addChannel = (name) => axios.post(routes.channelsPath(), {
  data: {
    attributes: {
      name,
    },
  },
});

export const removeChannel = (id) => axios.delete(routes.channelPath(id));


export const renameChannel = (id, name) => axios.patch(routes.channelPath(id), {
  data: {
    attributes: {
      name,
    },
  },
});

export default channelsSlice.reducer;
