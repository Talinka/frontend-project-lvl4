import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addMessage } from '../features/messages/messagesSlice';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
  messageDetails: state.messageDetails,
});

const mapDispatchToProps = { addNewMessage: addMessage };

const NewMessageForm = (props) => {
  const {
    addNewMessage, currentChannelId, username, messageDetails,
  } = props;
  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values, { resetForm }) => {
      addNewMessage(values.body, username, currentChannelId);
      resetForm({ body: '' });
    },
  });

  return (
    <div className="mt-auto">
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              name="body"
              className="form-control"
              value={formik.values.body}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <div className="d-block invalid-feedback">
              {messageDetails.error}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm);
