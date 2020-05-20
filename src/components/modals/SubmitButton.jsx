import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton = (props) => {
  const {
    isSubmitting, text, submittingText, disabled, type, onClick,
  } = props;

  return (
    <Button
      variant="primary"
      type={type}
      disabled={disabled || isSubmitting}
      onClick={onClick}
    >
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className={isSubmitting ? 'd-inline-block' : 'd-none'}
      />
      {isSubmitting ? submittingText : text}
    </Button>
  );
};

export default SubmitButton;
