import React from 'react';
import _ from 'lodash';

// export default class Channels extends React.Component {
export default function Channels(props) {
  const { channels } = props;
  const channelItems = channels.map(({ name }) => (
    <li key={_.uniqueId()} className="nav-item">
      {name}
    </li>
  ));
  return (
    <div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channelItems}
      </ul>
    </div>
  );
}
