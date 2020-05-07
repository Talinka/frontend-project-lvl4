import React, { createRef, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addMessage } from '../features/messages/messagesSlice';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
  messageAddingState: state.messageAddingState,
});

const mapDispatchToProps = { add: addMessage };

const NewMessageForm = (props) => {
  const {
    add, currentChannelId, username, messageAddingState,
  } = props;

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        await add(values.body, username, currentChannelId);
        resetForm();
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  const inputClassNames = classNames(
    'form-control',
    { 'is-invalid': messageAddingState.error },
  );

  const inputRef = createRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="mt-auto">
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              name="body"
              ref={inputRef}
              className={inputClassNames}
              value={formik.values.body}
              onChange={formik.handleChange}
              disabled={messageAddingState.adding}
            />
            <div className="d-block invalid-feedback">
              {messageAddingState.error}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageForm);
