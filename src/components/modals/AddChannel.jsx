import React, { useEffect, createRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormControl, Button, Form,
} from 'react-bootstrap';
import { addChannel } from '../../slices/channelsSlice';
import SubmitButton from './SubmitButton';

const AddChannel = (props) => {
  const { hideModal, showError } = props;

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: async (values) => {
      try {
        await addChannel(values.name);
        hideModal();
      } catch (error) {
        const message = `Error occured when adding channel ${values.name}. ${error.message}`;
        showError(message);
      }
    },
  });

  const inputRef = createRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Input channel name:</Form.Label>
            <FormControl
              name="name"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal} disabled={formik.isSubmitting} value="Close">
              Close
            </Button>
            <SubmitButton
              type="submit"
              isSubmitting={formik.isSubmitting}
              text="Add"
              submittingText="Adding..."
              disabled={formik.isSubmitting || !formik.dirty}
            />
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
