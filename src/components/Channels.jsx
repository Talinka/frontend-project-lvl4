import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { changeCurrentChannel } from '../features/channels/currentChannelSlice';

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

const mapDispatchToProps = { changeChannel: changeCurrentChannel };

function Channels(props) {
  const { channels, currentChannelId, changeChannel } = props;
  const channelItems = channels.map(({ id, name }) => {
    const classes = cn(
      'nav-link btn btn-block',
      { active: id === currentChannelId },
    );
    return (
      <li key={id} className="nav-item">
        <button
          type="button"
          className={classes}
          onClick={() => changeChannel(id)}
        >
          {name}
        </button>
      </li>
    );
  });
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channelItems}
      </ul>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Channels);
