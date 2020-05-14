import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

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
  addChannelStart = createAction('addChannelStart'),
  addChannelSuccess,
  addChannelFailure = createAction('addChannelFailure'),
  removeChannelStart = createAction('removeChannelStart'),
  removeChannelSuccess,
  removeChannelFailure = createAction('removeChannelFailure'),
  renameChannelStart = createAction('renameChannelStart'),
  renameChannelSuccess,
  renameChannelFailure = createAction('renameChannelFailure'),

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
    dispatch(addChannelSuccess(response.data));
  } catch (error) {
    console.error(`Can't create the channel. ${error.message}`);
    dispatch(addChannelFailure(error.message));
    throw error;
  }
};

export const removeChannel = (id) => async (dispatch) => {
  dispatch(removeChannelStart());
  try {
    await axios.delete(routes.channelPath(id));
    dispatch(removeChannelSuccess(id));
  } catch (error) {
    console.error(`Can't delete the channel. ${error.message}`);
    dispatch(removeChannelFailure(error.message));
    throw error;
  }
};

export const renameChannel = (id, name) => async (dispatch) => {
  dispatch(renameChannelStart());
  try {
    const response = await axios.patch(routes.channelPath(id), {
      data: {
        attributes: {
          name,
        },
      },
    });
    dispatch(renameChannelSuccess(response.data));
  } catch (error) {
    console.error(`Can't rename the channel. ${error.message}`);
    dispatch(renameChannelFailure(error.message));
    throw error;
  }
};


export default channelsSlice.reducer;
