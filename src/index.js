// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './channels';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels } = gon;
console.log('channels', channels);
const channelList = React.createElement(Channels, { channels });
const container = document.querySelector('.container');
ReactDOM.render(channelList, container);
