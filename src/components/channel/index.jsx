import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clientDomain, botUsername, apiEndPoint, token } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { toast } from 'react-toastify';

const Channel = () => {
  const history = useHistory()

  const [channel, setChannel] = useState('')
  const [isModerator, setModerator] = useState(true)
  const [botActive, setActive] = useState(false)

  useEffect(() => {
    document.title = 'xlllBot - Channel'
    const fetchChannel = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/channel', {
          headers: { Authorization: token }
        })
        if (data.status === 401) {
          localStorage.clear()
          toast.error('You are not authorized', { position: toast.POSITION.BOTTOM_RIGHT })
          history.push('/')
          return
        }
        const channel = await data.json()

        setChannel(channel[0].name)
        if (!!channel[0].bot_active) setActive(true)
      } catch(e) {
        console.error(e)
      }
    }

    const fetchModerators = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/channel/mods', {
          headers: { Authorization: token }
        })
        if (data.status === 401) {
          localStorage.clear()
          toast.error('You are not authorized', { position: toast.POSITION.BOTTOM_RIGHT })
          history.push('/')
          return
        }
        const moderators = await data.json()

        if (moderators.length) {
          const botIsModerator = !!moderators.filter(i => i === botUsername.toLowerCase()).length

          setModerator(botIsModerator)
        }
      } catch(e) {
        console.error(e)
      }
    }

    fetchChannel()
    fetchModerators()
  }, [history])

  const changeActive = (e) => {
    const bool = e.currentTarget.checked
    bool ? joinToChat() : leaveChat()
  }

  const joinToChat = () => {
    fetch(apiEndPoint + '/api/bot/join', {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setActive(true)
          toast.success('Bot successfully joined to chat', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error('Failed to join')
      })
      .catch(() => {
        setActive(false)
        toast.error('Failed to join', { position: toast.POSITION.BOTTOM_RIGHT })
      })
  }

  const leaveChat = () => {
    fetch(apiEndPoint + '/api/bot/leave', {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setActive(false)
          toast.success('Bot successfully left chat', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error('Failed to join')
      })
      .catch(() => {
        setActive(false)
        toast.error('Failed to leave from chat', { position: toast.POSITION.BOTTOM_RIGHT })
      })
  }

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm videoblock">
          <header className="content__header">
            <h2>Channel <small>Dashboard</small></h2>
          </header>

          {!isModerator && (
            <div className="card">
              <div className="card__body">
                <div className="card__sub">
                  <div className="error_title">
                    <div className="alert_info">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                        <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      </svg>
                      {botUsername} не является модератором в чате!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <div className={botActive ? 'success_title' : 'error_title'}>
                  <div className="alert_info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                    </svg>
                    <label className="switch">
                      <input type="checkbox" onChange={changeActive.bind(this)} checked={botActive} />
                      <span>
                        {!botActive ? `${botUsername} не активен! Нажмите чтобы активировать` : `${botUsername} подключен к чату`}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <div id="content_inner" className="videos_inner">

                  <div className="vid-main-wrapper">
                    <div className="vid-container">
                      {!!channel ? (
                        <iframe
                          title="TwitchPlayer"
                          src={`https://player.twitch.tv/?channel=${localStorage.getItem('userLogin')}&parent=${clientDomain}`}
                          frameBorder="0"
                          allowFullScreen={true}
                          scrolling="no"
                          width="560"
                          height="384" />
                      ) : <Loader />}
                    </div>

                    <div className="vid-list-container">
                      <ul>
                        <ol id="vid-list" style={{ 'lineHeight': 0 }}>
                          {!!channel && (
                            <iframe
                              title="TwitchChat"
                              src={`https://www.twitch.tv/embed/${localStorage.getItem('userLogin')}/chat?darkpopout&parent=${clientDomain}`}
                              frameBorder="0"
                              scrolling="no"
                              width="284"
                              height="384" />
                          )}
                        </ol>
                      </ul>
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

export default Channel;
