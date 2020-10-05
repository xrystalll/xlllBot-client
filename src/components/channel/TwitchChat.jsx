import React from 'react';

export const TwitchChat = ({ channel, clientDomain }) => {
  return (
    <iframe
      title="TwitchChat"
      src={`https://www.twitch.tv/embed/${channel}/chat?darkpopout&parent=` + clientDomain}
      frameBorder="0"
      scrolling="no"
      width="284"
      height="384" />
  )
}
