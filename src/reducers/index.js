import { combineReducers } from 'redux';
import messagesReducer from '../features/messages/messagesSlice';
import channelsReducer from '../features/channels/channelsSlice';
import currentChannelReducer from '../features/channels/currentChannelSlice';
import messageAddingStateReducer from '../features/messages/messageAddingStateSlice';
import channelAddingStateReducer from '../features/channels/ChannelAddingStateSlice';
import channelRemovingStateReducer from '../features/channels/ChannelRemovingStateSlice';
import channelRenamingStateReducer from '../features/channels/ChannelRenamingStateSlice';


export default combineReducers({
  messages: messagesReducer,
  messageAddingState: messageAddingStateReducer,
  channels: channelsReducer,
  currentChannelId: currentChannelReducer,
  channelAddingState: channelAddingStateReducer,
  channelRemovingState: channelRemovingStateReducer,
  channelRenamingState: channelRenamingStateReducer,
});
