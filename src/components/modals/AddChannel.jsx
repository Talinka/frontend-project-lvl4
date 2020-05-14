import React, { useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Button, Form, Spinner,
} from 'react-bootstrap';
import { addChannel } from '../../features/channels/channelsSlice';

const mapStateToProps = (state) => ({
  channelAddingState: state.channelAddingState,
});

const mapDispatchToProps = { addNewChannel: addChannel };

const AddChannel = (props) => {
  const {
    addNewChannel, hideModal, showModal, channelAddingState,
  } = props;

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      try {
        await addNewChannel(values.name);
        hideModal();
      } catch (error) {
        const message = `Error occured when adding channel ${values.name}. ${error.message}`;
        showModal('error', { message });
      }
    },
  });

  const inputRef = createRef();
  useEffect(() => inputRef.current.focus());

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label>Input channel name:</Form.Label>
          <FormControl
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={channelAddingState.adding}
            ref={inputRef}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal} disabled={channelAddingState.adding}>
          Close
        </Button>
        <Button variant="primary" type="submit" disabled={channelAddingState.adding}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className={channelAddingState.adding ? 'd-inline-block' : 'd-none'}
          />
          {channelAddingState.adding ? 'Adding...' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddChannel);
