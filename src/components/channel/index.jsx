import React, { useState, useEffect } from 'react';
import conf from 'config.json';
import Header from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';

const token = 'Basic ' + btoa(`xlllClient:${localStorage.getItem('userHash')}`)
const Channel = () => {
  useEffect(() => {
    document.title = 'xlllBot - Channel'
    fetchChannel()
  }, [])

  const [channel, setItems] = useState([])

  const fetchChannel = async () => {
    const data = await fetch(`${conf.apiEndPoint}/api/channel`, {
      headers: new Headers({ 'Authorization': token })
    })
    const channel = await data.json()

    setItems(channel[0])
  }

  return (
    <>
      <Header />

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
                            src={`https://player.twitch.tv/?channel=${localStorage.getItem('userLogin')}`}
                            frameBorder="0"
                            allowFullScreen={true}
                            scrolling="no"
                            width="560"
                            height="384" />
                        ) : (
                          <Loader />
                        )}
                      </div>

                      <div className="vid-list-container">
                        <ul>
                          <ol id="vid-list" style={{'lineHeight': 0}}>
                            {!!channel ? (
                              <iframe
                                title="TwitchChat"
                                src={`https://www.twitch.tv/embed/${localStorage.getItem('userLogin')}/chat?darkpopout`}
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
    </>
  )
}

export default Channel;
