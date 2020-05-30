import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Channels from './Channels';
import MessageBox from './MessageBox';
import NewMessageForm from './NewMessageForm';
import getModal from './modals';

const App = () => {
  const [modalInfo, setModalInfo] = useState({ type: null, value: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });
  const showError = (message) => showModal('error', message);

  const renderModal = () => {
    if (!modalInfo.type) {
      return null;
    }
    const Component = getModal(modalInfo.type);
    return <Component hideModal={hideModal} showError={showError} item={modalInfo.item} />;
  };

  return (
    <div className="h-100" id="chat">
      <Row className="pb-3 h-100">
        <Channels showModal={showModal} />
        <Col className="h-100">
          <div className="d-flex flex-column h-100">
            <MessageBox />
            <NewMessageForm />
          </div>
        </Col>
      </Row>
      {renderModal()}
    </div>
  );
};

export default App;
