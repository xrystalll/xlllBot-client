import React from 'react';

export const TwitchPlayer = ({ channel, clientDomain }) => {
  return (
    <iframe
      title="TwitchPlayer"
      src={`https://player.twitch.tv/?channel=${channel}&parent=` + clientDomain}
      frameBorder="0"
      allowFullScreen={true}
      scrolling="no"
      width="560"
      height="384" />
  )
}
