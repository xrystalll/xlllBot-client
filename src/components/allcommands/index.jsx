import React, { useState, useEffect } from 'react';
import { apiEndPoint } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Errorer } from '../partials/Error';

const AllCommand = () => {
  const [items, setItems] = useState([])
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    document.title = 'xlllBot - All Commands'
    const fetchGames = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/games')

        const items = await data.json()

        if (items.length > 0) {
          setItems(items)
        } else {
          setNoData(true)
        }
      } catch(e) {
        setNoData(true)
        console.error(e)
      }
    }

    fetchGames()
  }, [])

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm">
          <header className="content__header">
            <h2>General commands</h2>
          </header>

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <h4>Commands list</h4>
                <div id="content_inner">
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!up or !time or !uptime" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Stream duration" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!old or !oldfag or !followage <username or empty>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Channel follow period" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!ping" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Game 'Ping Pong'" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!size <username or empty>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Game 'Size'" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!sr <youtube link>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Video request" />
                  </div>
                  <br></br>
                  <h4>For moderators and owner</h4>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!mute, !timeout <username> <duration or empty>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Timeout user" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!ban, !permit <username> <reason or empty>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Permanent ban user" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!unban <username>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Unban user" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!skip" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Skip played video" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!game <full game name or short>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Set stream category. Short name is in the list below" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!title <text>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Set stream name" />
                  </div>
                  <div className="command_form">
                    <input className="input_text command_name full" type="text" placeholder="Command" defaultValue="!poll or !vote <Question | variant1 | variant2 | ...>" />
                    <input className="input_text command_text" type="text" placeholder="Description" defaultValue="Create Stravpoll vote" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <h4>Short categores names list</h4>
                <div id="content_inner2">
                  {items.length > 0 ? (
                    items.map(item => (
                      <div className="command_form" key={item._id}>
                        <input className="input_text command_name" type="text" placeholder="Command" defaultValue={item.short} />
                        <input className="input_text command_text" type="text" placeholder="Stream category" defaultValue={item.game} />
                      </div>
                    ))
                  ) : (
                    !noData ? <Loader /> : <Errorer message="Commands not exists" />
                  )}
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

export default AllCommand;
