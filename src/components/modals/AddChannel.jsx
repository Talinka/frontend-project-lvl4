import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import { useFormik } from 'formik';
// import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { addChannel } from '../../features/channels/channelsSlice';

const mapStateToProps = (state) => ({
  channelAddingState: state.channelAddingState,
});

const mapDispatchToProps = { addNewChannel: addChannel };

const AddChannel = () => {
/*
  const { addNewChannel } = props;

  const formik = useFormik({
      initialValues: { name: '' },
      onSubmit: (values) => {
        addNewChannel(values.name);
      },
    });
*/
  const textInput = useRef(null);
  useEffect(() => textInput.current.focus());

  return (
    /*
    <Modal.Dialog>
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              name="name"
              required
              ref={textInput}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </Modal.Body>
    </Modal.Dialog>
    */
    <>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddChannel);
