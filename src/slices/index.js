import { combineReducers } from 'redux';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import currentChannelReducer from './currentChannelSlice';

export default combineReducers({
  messages: messagesReducer,
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
});
