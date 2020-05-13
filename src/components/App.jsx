import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Channels from './Channels';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';
import getModal from './modals';
import UsernameContext from '../context';

const App = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, value: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const renderModal = () => {
    if (!modalInfo.type) {
      return null;
    }
    const Component = getModal(modalInfo.type);
    return <Component hideModal={hideModal} item={modalInfo.item} />;
  };

  return (
    <UsernameContext.Provider value={Cookies.get('username')}>
      <div className="h-100" id="chat">
        <div className="row h-100 pb-3">
          <Channels showModal={showModal} />
          {renderModal()}
          <div className="col h-100">
            <div className="d-flex flex-column h-100">
              <MessageBox />
              <NewMessageForm />
            </div>
          </div>
        </div>
      </div>
    </UsernameContext.Provider>
  );
};

export default App;
