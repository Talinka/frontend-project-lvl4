import React, { useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Button, Form, Spinner,
} from 'react-bootstrap';
import { renameChannel } from '../../features/channels/channelsSlice';

const mapStateToProps = (state) => ({
  channelRenamingState: state.channelRenamingState,
});

const mapDispatchToProps = { renameCurrentChannel: renameChannel };

const RenameChannel = (props) => {
  const {
    item, renameCurrentChannel, hideModal, channelRenamingState,
  } = props;

  const formik = useFormik({
    initialValues: { name: item.name },
    onSubmit: async (values) => {
      await renameCurrentChannel(item.id, values.name);
      hideModal();
    },
  });

  const inputRef = createRef();
  useEffect(() => inputRef.current.focus());

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Label>Input new channel name:</Form.Label>
          <FormControl
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={channelRenamingState.renaming}
            ref={inputRef}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal} disabled={channelRenamingState.renaming}>
          Close
        </Button>
        <Button variant="primary" type="submit" disabled={channelRenamingState.renaming}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className={channelRenamingState.renaming ? 'd-inline-block' : 'd-none'}
          />
          {channelRenamingState.renaming ? 'Renaming...' : 'Rename'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenameChannel);
