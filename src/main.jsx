// @ts-check
import gon from 'gon';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './slices';
import { newMessage } from './slices/messagesSlice';
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
  socket.on('newMessage', (msg) => {
    store.dispatch(newMessage(msg.data.attributes));
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
