// @ts-check
import gon from 'gon';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './slices';
import { newMessage } from './slices/messagesSlice';
import { addChannelSuccess, removeChannelSuccess, renameChannelSuccess } from './slices/channelsSlice';
import UsernameContext from './context';
import createUser from './user';
import App from './components/App';

export default () => {
  const userName = createUser();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: gon,
  });

  const socket = io();
  socket.on('connect', () => console.log('Connect OK'));
  socket.on('newMessage', ({ data }) => {
    store.dispatch(newMessage(data.attributes));
  });
  socket.on('newChannel', ({ data }) => {
    store.dispatch(addChannelSuccess(data));
  });
  socket.on('removeChannel', ({ data }) => {
    store.dispatch(removeChannelSuccess(data.id));
  });
  socket.on('renameChannel', ({ data }) => {
    store.dispatch(renameChannelSuccess(data.attributes));
  });


  ReactDOM.render(
    <Provider store={store}>
      <UsernameContext.Provider value={userName}>
        <App />
      </UsernameContext.Provider>
    </Provider>,
    document.querySelector('.container-lg'),
  );
};
