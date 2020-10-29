import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie, clearCookies } from 'components/support/Utils';
import { botUsername, apiEndPoint } from 'config';
import { BotModerator, BotActive } from './BotAlerts';
import { TwitchPlayer } from './TwitchPlayer';
import { TwitchChat } from './TwitchChat';
import Card from 'components/partials/Card';
import Footer from 'components/partials/Footer';
import { Loader } from 'components/partials/Loader';
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
          headers: {
            Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token'))
          }
        })
        if (data.status === 401) {
          clearCookies()
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
          headers: {
            Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token'))
          }
        })
        if (data.status === 401) {
          clearCookies()
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
      headers: {
        Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token'))
      }
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
      headers: {
        Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token'))
      }
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

          <Card className="videos_inner">
            <div className="vid-main-wrapper">
              <div className="vid-container">
                {!!channel ? <TwitchPlayer channel={channel} /> : <Loader />}
              </div>

              <div className="vid-list-container">
                <ul>
                  <ol id="vid-list" style={{ 'lineHeight': 0 }}>
                    {!!channel && <TwitchChat channel={channel} />}
                  </ol>
                </ul>
              </div>
            </div>
          </Card>

        </div>
      </section>

      <Footer />

    </section>
  )
}

export default Channel;
