import React, { Component } from 'react';
import { channel } from 'config';
import { socket } from 'instance/Socket';
import YouTube from 'react-youtube';
import CustomScrollbar from '../support/CustomScrollbar';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Error } from '../partials/Error';
import { toast } from 'react-toastify';

let player
class Songs extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      playIndex: 0,
      noData: false
    }
    this.playBtnRef = React.createRef()
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
  }

  componentDidMount() {
    document.title = 'xlllBot - Stream Dj'
    socket.emit('video_items', { channel })
    socket.on('output_videos', (data) => {
      if (data.length > 0) {
        this.setState({ response: data })
      } else {
        this.setState({ noData: true })
      }
    })
    this.subscribeToEvents()
  }

  subscribeToEvents() {
    socket.on('new_video', (data) => {
      if (data.channel !== channel) return

      this.setState({ response: [...this.state.response, data], noData: false })
    })
    socket.on('deteted', (data) => {
      this.setState({ response: this.state.response.filter(items => items._id !== data.id) })
      toast.success('Video successfully removed', { position: toast.POSITION.BOTTOM_RIGHT })
      if (this.state.response.filter(items => items._id !== data.id).length === 0) {
        this.setState({ noData: true })
      }
    })
    socket.on('skip', (data) => {
      if (data.channel !== channel) return
      if (player.getPlayerState() !== 1) return

      this.skip()
    })
  }

  deleteVideo(id, e) {
    e.stopPropagation()
    socket.emit('delete_video', { id, channel })
  }

  toHHMMSS(sec = 0) {
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

  counter(count = 0) {
    if (count < 1e3) return count
    if (count >= 1e3 && count < 1e6) return `${+(count / 1e3).toFixed(1)}K`
    if (count >= 1e6 && count < 1e9) return `${+(count / 1e6).toFixed(1)}M`
    if (count >= 1e9 && count < 1e12) return `${+(count / 1e9).toFixed(1)}B`
  }

  youtubeId(url) {
    const match = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
    return match !== null ? match[1] : 0
  }

  onPlayerReady(e) {
    player = e.target
  }

  onPlay() {
    this.playBtnRef.current.classList.add('playing')
  }

  onPause() {
    this.playBtnRef.current.classList.remove('playing')
  }

  onPlayPause() {
    if (player === undefined) return

    if (player.getPlayerState() === 1) player.pauseVideo()
    else player.playVideo()
  }

  chooseVideo(data, e) {
    this.setState({ playIndex: Number(data.index) })

    if (player === undefined) return

    player.loadVideoById(this.youtubeId(data.url))
  }

  skip() {
    const { response } = this.state

    if (response.length === 0) return

    let thisIndex = this.state.playIndex + 1
    if (thisIndex >= response.length) thisIndex = 0
    this.setState({ playIndex: thisIndex })
    const url = response[thisIndex].url

    if (player === undefined) return

    player.loadVideoById(this.youtubeId(url))
  }

  render() {
    const { response } = this.state
    const ytOptions = {
      height: '384',
      width: '560',
      playerVars: {
        autoplay: 0
      }
    }

    return (
      <section id="main">

        <section id="content">
          <div className="content--boxed-sm videoblock">
            <header className="content__header">
              <h2>Stream Dj <small>Dashboard</small></h2>
              <div className="controls">
                <div ref={this.playBtnRef} onClick={this.onPlayPause} className="play_btn play" title="Play/Pause"></div>
                <div onClick={this.skip.bind(this)} className="play_btn skip small" title="Skip"></div>
              </div>
            </header>

            <div className="card">
              <div className="card__body">
                <div className="card__sub">
                  <div id="content_inner" className="videos_inner">

                    <div className="vid-main-wrapper">
                      <div className="vid-container">
                        {response.length > 0 ? (
                          <YouTube
                            opts={ytOptions}
                            videoId={this.youtubeId(response[0].url)}
                            containerClassName="iframe"
                            onReady={this.onPlayerReady}
                            onPlay={this.onPlay}
                            onPause={this.onPause}
                            onEnd={this.skip.bind(this)} />
                        ) : (
                          !this.state.noData ? <Loader /> : <Error message="No videos yet" />
                        )}
                      </div>

                      <div className="vid-list-container">
                        <CustomScrollbar className="view">
                          <ul>
                            <ol id="vid-list">
                              {response.length > 0 ? (
                                response.map((item, index) => (
                                  <li
                                    key={item._id}
                                    onClick={this.chooseVideo.bind(this, { url: item.url, index })}
                                    className={`videoItem${this.state.playIndex === index ? ' selected' : ''}`}
                                  >
                                    <div className="chooseVid">
                                      <span className="vid-thumb" style={{'backgroundImage': `url(${item.thumb})`}}>
                                        <div className="vidDuration">{this.toHHMMSS(item.duration)}</div>
                                      </span>
                                      <div className="vidInfo">
                                        <div className="desc">{item.title}</div>
                                        <div className="owner">{item.owner}</div>
                                        <div className="views">{this.counter(item.views)} views</div>
                                      </div>
                                      <div
                                        onClick={this.deleteVideo.bind(this, item._id)}
                                        className="removeVid"
                                        title="Remove video from playlist"
                                      >
                                        <i className="material-icons">delete</i>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : null}
                            </ol>
                          </ul>
                        </CustomScrollbar>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

      </section>
    )
  }
}

export default Songs;
