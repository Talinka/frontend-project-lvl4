import React, { createRef, useEffect, useContext } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addMessage } from '../features/messages/messagesSlice';
import UsernameContext from '../context';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
  messageAddingState: state.messageAddingState,
});

const mapDispatchToProps = { add: addMessage };

const NewMessageForm = (props) => {
  const {
    add, currentChannelId, messageAddingState,
  } = props;

  const username = useContext(UsernameContext);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      await add(values.body, username, currentChannelId);
      resetForm();
    },
  });

  const inputRef = createRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="mt-auto">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup>
            <FormControl
              required
              name="body"
              ref={inputRef}
              className={messageAddingState.error ? 'is-invalid' : ''}
              value={formik.values.body}
              onChange={formik.handleChange}
              disabled={messageAddingState.adding}
            />
            <Form.Control.Feedback type="invalid">
              {messageAddingState.error}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageForm);
