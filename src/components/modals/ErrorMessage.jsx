import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorMessage = (props) => {
  const { item, hideModal } = props;

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{item.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorMessage;
