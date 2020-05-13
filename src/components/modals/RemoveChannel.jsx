import React from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Spinner,
} from 'react-bootstrap';
import { removeChannel } from '../../features/channels/channelsSlice';
import { changeCurrentChannel } from '../../features/channels/currentChannelSlice';

const mapStateToProps = (state) => ({
  channelRemovingState: state.channelRemovingState,
});

const mapDispatchToProps = { removeCurrentChannel: removeChannel, changeCurrentChannel };

const RemoveChannel = (props) => {
  const {
    item, removeCurrentChannel, hideModal, channelRemovingState,
  } = props;

  const handleRemove = async () => {
    await removeCurrentChannel(item.id);
    props.changeCurrentChannel();
    hideModal();
  };

  const text = `Do you want to remove channel ${item.name}?`;

  return (
    <Modal show onHide={hideModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal} disabled={channelRemovingState.removing}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRemove} disabled={channelRemovingState.removing}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className={channelRemovingState.removing ? 'd-inline-block' : 'd-none'}
          />
          {channelRemovingState.removing ? 'Removing...' : 'Remove'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemoveChannel);
