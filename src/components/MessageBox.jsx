import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const selectMessages = (state) => state.messages;
const selectCurrentChannelId = (state) => state.currentChannelId;

const selectVisibleMessages = createSelector(
  [selectMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  ),
);

const mapStateToProps = (state) => ({
  messages: selectVisibleMessages(state),
});

function MessageBox(props) {
  console.log('props', props);
  const { messages } = props;
  if (messages.length === 0) {
    return null;
  }

  const messageItems = messages.map(({ id, body, username }) => (
    <div key={id}>
      <b>{username}</b>
      :
      {body}
    </div>
  ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messageItems}
    </div>
  );
}

export default connect(mapStateToProps)(MessageBox);
