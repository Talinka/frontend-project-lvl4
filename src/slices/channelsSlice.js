import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    addChannelSuccess(state, action) {
      const { attributes } = action.payload.data;
      state.push(attributes);
    },
    removeChannelSuccess(state, action) {
      const id = action.payload;
      return state.filter((channel) => channel.id !== id);
    },
    renameChannelSuccess(state, action) {
      const { attributes } = action.payload.data;
      const { id } = attributes;
      return state.map((channel) => (
        channel.id === id ? attributes : channel
      ));
    },
  },
});

export const {
  addChannelSuccess,
  removeChannelSuccess,
  renameChannelSuccess,
} = channelsSlice.actions;

export const addChannel = (name) => async (dispatch) => {
  const response = await axios.post(routes.channelsPath(), {
    data: {
      attributes: {
        name,
      },
    },
  });
  dispatch(addChannelSuccess(response.data));
};

export const removeChannel = (id) => async (dispatch) => {
  await axios.delete(routes.channelPath(id));
  dispatch(removeChannelSuccess(id));
};

export const renameChannel = (id, name) => async (dispatch) => {
  const response = await axios.patch(routes.channelPath(id), {
    data: {
      attributes: {
        name,
      },
    },
  });
  dispatch(renameChannelSuccess(response.data));
};


export default channelsSlice.reducer;
