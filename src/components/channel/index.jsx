import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clientDomain, botUsername, apiEndPoint, token } from 'config';
import { BotModerator, BotActive } from './BotAlerts';
import { TwitchPlayer } from './TwitchPlayer';
import { TwitchChat } from './TwitchChat';
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
        } else throw Error(data.error)
      })
      .catch(err => {
        setActive(false)
        toast.error(err ? err.message : 'Failed to join', { position: toast.POSITION.BOTTOM_RIGHT })
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
        } else throw Error(data.error)
      })
      .catch(err => {
        setActive(false)
        toast.error(err ? err.message : 'Failed to leave from chat', { position: toast.POSITION.BOTTOM_RIGHT })
      })
  }

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm videoblock">
          <header className="content__header">
            <h2>Channel <small>Dashboard</small></h2>
          </header>

          {!isModerator && <BotModerator botUsername={botUsername} />}

          <BotActive state={botActive} botUsername={botUsername} changeActive={changeActive} />

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <div id="content_inner" className="videos_inner">

                  <div className="vid-main-wrapper">
                    <div className="vid-container">
                      {!!channel ? <TwitchPlayer channel={channel} clientDomain={clientDomain} /> : <Loader />}
                    </div>

                    <div className="vid-list-container">
                      <ul>
                        <ol id="vid-list" style={{ 'lineHeight': 0 }}>
                          {!!channel && <TwitchChat channel={channel} clientDomain={clientDomain} />}
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
