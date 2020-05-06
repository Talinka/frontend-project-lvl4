import React from 'react';
import Cookies from 'js-cookie';
import Channels from './Channels';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';

const UsernameContext = React.createContext(Cookies.get('username'));

export default function App(props) {
  const { channels, messages, currentChannelId } = props;

  return (
    <div className="h-100" id="chat">
      <div className="row h-100 pb-3">
        <Channels channels={channels} currentChannelId={currentChannelId} />
        <div className="col h-100">
          <div className="d-flex flex-column h-100">
            <MessageBox messages={messages} />
            <UsernameContext.Consumer>
              {(username) => (
                <NewMessageForm username={username} />
              )}
            </UsernameContext.Consumer>
          </div>
        </div>
      </div>
    </div>
  );
}
