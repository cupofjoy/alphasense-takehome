import React, { Component } from 'react';

const Navigation = ({ channels, onChannelClick }) => {
  const renderChannels = () => {
    // render list of channels
    // first check if there are any channels
    if (channels.length > 0) {
      // channels exists so render them in an unordered list
      return channels.map((channel, index) => {
        return (
          <li
            key={`channel-${index}`}
            onClick={(e) => onChannelClick(e, channel)}
          >
            {channel}
          </li>
        )
      })
    } else {
      return null
    }
  }

  return (
    <div className='nav'>
      CHANNELS
      <ul className='channel-list'>
        {renderChannels()}
      </ul>
    </div>
  );
}

export default Navigation;