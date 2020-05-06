import { combineReducers } from 'redux';
import messagesReducer from '../features/messages/messagesSlice';
import channelsReducer from '../features/channels/channelsSlice';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import messageDetailsReducer from '../features/messages/messageDetailsSlice';

export default combineReducers({
  messages: messagesReducer,
  messageDetails: messageDetailsReducer,
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
});
