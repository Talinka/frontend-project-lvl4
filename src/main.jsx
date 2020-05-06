import { Provider } from 'react-redux';
import React from 'react';
import App from './components/App';

export default function getApp(store) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
