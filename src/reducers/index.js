import { combineReducers } from 'redux';
import messagesReducer from '../features/messages/messagesSlice';
import channelsReducer from '../features/channels/channelsSlice';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import messageAddingStateReducer from '../features/messages/messageAddingStateSlice';

export default combineReducers({
  messages: messagesReducer,
  messageAddingState: messageAddingStateReducer,
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
});
