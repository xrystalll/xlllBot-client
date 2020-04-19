import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiEndPoint } from 'config';
import { socket } from 'instance/Socket';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      authClicked: false,
      isAuth: false
    }
  }

  componentDidMount() {
    document.title = 'xlllBot'
    socket.on('user_data', (data) => {
      if (!data.error) {
        if (this.state.authClicked && !localStorage.getItem('userHash')) {
          this.setState({ isAuth: true })
          localStorage.setItem('userLogin', data[0].login)
          localStorage.setItem('userHash', data[0].hash)
          localStorage.setItem('userLogo', data[0].logo)
          window.location.reload()
        }
      }
    })
  }

  openAuth(url, e) {
    this.setState({ authClicked: true })
    window.open(url, 'Sign in via Twitch', 'height=520,width=480')
  }

  render() {
    return (
      <main className="landing">
        <div className="bg" />
        <div className="container">
          <div className="landing_content">
            <h1 className="main_head">xlllBot</h1>
            <div className="main_sub">Chat bot for Twitch</div>
            <div className="auth_block_main">
              {localStorage.getItem('userHash') || this.state.isAuth ? (
                <Link className="twitch_btn_main" to="/dashboard/channel">Open dashboard</Link>
              ) : (
                <div onClick={this.openAuth.bind(this, apiEndPoint + '/auth/twitch')} className="twitch_btn_main">
                  <svg className="tw-glitch-logo__svg" overflow="visible" width="40px" height="40px" version="1.1" viewBox="0 0 40 40" x="0px" y="0px">
                    <polygon className="tw-glitch-logo__body" points="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8" />
                    <polygon className="tw-glitch-logo__face" points="26 25 30 21 30 10 14 10 14 25 18 25 18 29 22 25" transform="translate(0 0)" />
                    <path className="tw-glitch-logo__eyes" d="M20,14 L22,14 L22,20 L20,20 L20,14 Z M27,14 L27,20 L25,20 L25,14 L27,14 Z" transform="translate(0 0)" />
                  </svg>
                  Sign in via Twitch
                </div>
              )}
            </div>
          </div>
          <div className="main_copy">
            <a href={'https://github.com/xrystalll'} target="_blank" rel="noopener noreferrer">by xrystalll</a>
          </div>
        </div>
      </main>
    )
  }
}

export default Home;
