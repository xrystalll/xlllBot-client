import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { clientDomain, apiEndPoint, token } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { toast } from 'react-toastify';

const Channel = () => {
  const history = useHistory()

  const [channel, setChannel] = useState([])

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

        setChannel(channel[0])
      } catch(e) {
        console.error(e)
      }
    }

    fetchChannel()
  }, [history])

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm videoblock">
          <header className="content__header">
            <h2>Channel <small>Dashboard</small></h2>
          </header>

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
                        <ol id="vid-list" style={{'lineHeight': 0}}>
                          {!!channel ? (
                            <iframe
                              title="TwitchChat"
                              src={`https://www.twitch.tv/embed/${localStorage.getItem('userLogin')}/chat?darkpopout&parent=${clientDomain}`}
                              frameBorder="0"
                              scrolling="no"
                              width="284"
                              height="384" />
                          ) : null}
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
