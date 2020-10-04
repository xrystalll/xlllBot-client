import React from 'react';

export const VideoItem = ({ index, playIndex, data, chooseVideo, deleteVideo }) => {
  const toHHMMSS = (sec = 0) => {
    const secNum = parseInt(sec, 10)
    const hours = Math.floor(secNum / 3600)
    const minutes = Math.floor((secNum - (hours * 3600)) / 60)
    const seconds = secNum - (hours * 3600) - (minutes * 60)

    return (
      (hours || '') + (hours > 0 ? ':' : '') +
      (minutes < 10 && hours > 0 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds
    )
  }

  const counter = (count = 0) => {
    if (count < 1e3) return count
    if (count >= 1e3 && count < 1e6) return `${+(count / 1e3).toFixed(1)}K`
    if (count >= 1e6 && count < 1e9) return `${+(count / 1e6).toFixed(1)}M`
    if (count >= 1e9 && count < 1e12) return `${+(count / 1e9).toFixed(1)}B`
  }

  return (
    <li
      className={`videoItem${playIndex === index ? ' selected' : ''}`}
      onClick={chooseVideo.bind(this, { id: data.yid, index })}
    >
      <div className="chooseVid">
        <span className="vid-thumb" style={{'backgroundImage': `url(${data.thumb})`}}>
          <div className="vidDuration">{toHHMMSS(data.duration)}</div>
        </span>
        <div className="vidInfo">
          <div className="desc">{data.title}</div>
          <div className="owner">{data.owner}</div>
          <div className="views">{counter(data.views)} views</div>
        </div>
        <div
          className="removeVid"
          onClick={deleteVideo.bind(this, data._id)}
          title="Remove video from playlist"
        >
          <i className="material-icons">delete</i>
        </div>
      </div>
    </li>
  )
}
