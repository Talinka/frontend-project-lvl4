import React, {
  createRef, useEffect, useContext,
} from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import UsernameContext from '../context';
import { addMessage } from '../slices/messagesSlice';

const NewMessageForm = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId);
  const username = useContext(UsernameContext);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }, { resetForm, setFieldError }) => {
      try {
        await addMessage(body, username, currentChannelId);
        resetForm();
      } catch (err) {
        setFieldError('body', err.message);
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
              className={formik.errors.body ? 'is-invalid' : ''}
              value={formik.values.body}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMessageForm;
