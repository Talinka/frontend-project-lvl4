// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom';

import rootReducer from './reducers';
import getApp from './main';

import { newMessage } from './features/messages/messagesSlice';
import usernameContext from './context';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const userName = faker.name.findName();
Cookies.set('username', userName);

const store = configureStore({
  reducer: rootReducer,
  preloadedState: gon,
});

const socket = io();
socket.on('connect', () => console.log('Connect OK'));
socket.on('newMessage', (msg) => {
  store.dispatch(newMessage(msg.data));
});
// TODO

const container = document.querySelector('.container-lg');
ReactDOM.render(getApp(store), container);
