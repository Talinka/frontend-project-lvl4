import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../../slices/channelsSlice';
import { changeCurrentChannel } from '../../slices/currentChannelSlice';
import SubmitButton from './SubmitButton';

const RemoveChannel = (props) => {
  const {
    item, hideModal, showError,
  } = props;
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = async () => {
    try {
      setSubmitting(true);
      await removeChannel(item.id);
      dispatch(changeCurrentChannel());
      hideModal();
    } catch (error) {
      setSubmitting(false);
      const message = `Error occured when removing channel ${item.name}. ${error.message}`;
      showError(message);
    }
  };

  const text = `Do you want to remove channel ${item.name} and all messages in it?`;

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal} disabled={isSubmitting}>
          Close
        </Button>
        <SubmitButton onClick={onSubmit} isSubmitting={isSubmitting} text="Remove" submittingText="Removing..." />
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
