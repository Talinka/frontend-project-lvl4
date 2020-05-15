import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
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
    return <Component hideModal={hideModal} showModal={showModal} item={modalInfo.item} />;
  };

  return (
    <UsernameContext.Provider value={Cookies.get('username')}>
      <div className="h-100" id="chat">
        <Row className="pb-3">
          <Channels showModal={showModal} />
          {renderModal()}
          <Col>
            <Col>
              <MessageBox />
              <NewMessageForm />
            </Col>
          </Col>
        </Row>
      </div>
    </UsernameContext.Provider>
  );
};

export default App;
