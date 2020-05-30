import React, { useEffect, createRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Button, Form,
} from 'react-bootstrap';
import { renameChannel } from '../../slices/channelsSlice';
import SubmitButton from './SubmitButton';

const RenameChannel = (props) => {
  const {
    item, hideModal, showError,
  } = props;

  const formik = useFormik({
    initialValues: { name: item.name },
    onSubmit: async (values) => {
      try {
        await renameChannel(item.id, values.name);
        hideModal();
      } catch (error) {
        const message = `Error occured when renaming channel ${item.name}. ${error.message}`;
        showError(message);
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
    </Modal>
  );
};

export default RenameChannel;
