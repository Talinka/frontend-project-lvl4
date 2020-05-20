import React, { useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Button, Form,
} from 'react-bootstrap';
import { renameChannel } from '../../slices/channelsSlice';
import SubmitButton from './SubmitButton';

const mapDispatchToProps = { renameCurrentChannel: renameChannel };

const RenameChannel = (props) => {
  const {
    item, renameCurrentChannel, showModal, hideModal,
  } = props;

  const formik = useFormik({
    initialValues: { name: item.name },
    onSubmit: async (values) => {
      try {
        await renameCurrentChannel(item.id, values.name);
        hideModal();
      } catch (error) {
        const message = `Error occured when renaming channel ${item.name}. ${error.message}`;
        console.error(message);
        showModal('error', { message });
      }
    },
  });

  const inputRef = createRef();
  useEffect(() => inputRef.current.focus());

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>

          <Form.Label>Input new channel name:</Form.Label>
          <FormControl
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal} disabled={formik.isSubmitting}>
            Close
          </Button>
          <SubmitButton
            type="submit"
            disabled={formik.isSubmitting || !formik.dirty}
            isSubmitting={formik.isSubmitting}
            text="Rename"
            submittingText="Renaming..."
          />
        </Modal.Footer>
      </form>
    </Modal >
  );
};

export default connect(
  null,
  mapDispatchToProps,
)(RenameChannel);
