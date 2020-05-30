import React, { createRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMessages } from '../slices/messagesSlice';

const MessageBox = () => {
  const messages = useSelector(selectCurrentMessages);

  const boxRef = createRef();
  useEffect(() => {
    boxRef.current.scrollTo(0, boxRef.current.scrollHeight);
  });

  const messageItems = messages.map(({ id, body, username }) => (
    <div key={id}>
      <b>{username}</b>
      :
      {body}
    </div>
  ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3" ref={boxRef}>
      {messageItems}
    </div>
  );
};

export default MessageBox;
