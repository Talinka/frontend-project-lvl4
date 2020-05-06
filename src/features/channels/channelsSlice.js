import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import routes from '../../routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    async addChannel(state, action) {
      const { name } = action.payload;
      try {
        const response = await axios.post(routes.channelsPath(), {
          data: {
            attributes: {
              name,
              username: Cookies.get('username'),
            },
          },
        });
        const newChannel = response.data;
        state.push(newChannel);
      } catch (error) {
        console.error(`Can't create the channel. ${error.message}`);
      }
    },
  },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
