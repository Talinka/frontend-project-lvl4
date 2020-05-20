import React, {
  createRef, useEffect, useContext, useState,
} from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addMessage } from '../slices/messagesSlice';
import UsernameContext from '../context';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = { add: addMessage };

const NewMessageForm = (props) => {
  const { add, currentChannelId } = props;
  const [error, setError] = useState(null);

  const username = useContext(UsernameContext);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        await add(values.body, username, currentChannelId);
        setError(null);
        resetForm();
      } catch (err) {
        setError(err.message);
      }
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
              className={error ? 'is-invalid' : ''}
              value={formik.values.body}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {error}
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
