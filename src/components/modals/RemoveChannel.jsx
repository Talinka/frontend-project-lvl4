import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../../slices/channelsSlice';
import { changeCurrentChannel } from '../../slices/currentChannelSlice';
import SubmitButton from './SubmitButton';

const mapDispatchToProps = { removeChannel, changeCurrentChannel };

const RemoveChannel = (props) => {
  const {
    item, showModal, hideModal,
  } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = async () => {
    try {
      setSubmitting(true);
      await props.removeChannel(item.id);
      props.changeCurrentChannel();
      hideModal();
    } catch (error) {
      setSubmitting(false);
      const message = `Error occured when removing channel ${item.name}. ${error.message}`;
      console.error(message);
      showModal('error', { message });
    }
  };

  const text = `Do you want to remove channel ${item.name}?`;

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

export default connect(
  null,
  mapDispatchToProps,
)(RemoveChannel);
