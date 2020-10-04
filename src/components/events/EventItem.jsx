import React from 'react';

export const EventItem = ({ data }) => {
  return (
    <div className="event_item">
      <div className="event_time">{this.timeFormat(data.time)}</div>
      <div>{data.text}</div>
    </div>
  )
}
