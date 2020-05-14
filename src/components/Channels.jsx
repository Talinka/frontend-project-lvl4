import React from 'react';
import { Nav, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeCurrentChannel } from '../features/channels/currentChannelSlice';

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = { changeChannel: changeCurrentChannel };

function Channels(props) {
  const {
    channels, currentChannelId, changeChannel, showModal,
  } = props;

  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  const channelItems = channels.map(({ id, name }) => (
    <Nav.Item key={id} as="li">
      <Nav.Link
        className={id === currentChannelId ? 'active' : ''}
        onClick={() => changeChannel(id)}
      >
        {name}
      </Nav.Link>
    </Nav.Item>
  ));

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <ButtonGroup className="ml-auto">
          <Button className="button-add" variant="link" onClick={() => showModal('add')} />
          <Button
            className="button-delete"
            variant="link"
            disabled={!currentChannel.removable}
            onClick={() => showModal('remove', currentChannel)}
          />
          <Button className="button-change" variant="link" onClick={() => showModal('rename', currentChannel)} />
        </ButtonGroup>
      </div>
      <Nav as="ul" fill variant="pills" className="flex-column">
        {channelItems}
      </Nav>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Channels);
