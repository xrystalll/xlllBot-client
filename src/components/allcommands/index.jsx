import React, { useState, useEffect } from 'react';
import { apiEndPoint } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Errorer } from '../partials/Error';

const AllCommand = () => {
  const [items, setItems] = useState([])
  const [noData, setNoData] = useState(false)
  const commands = {
    all: [{
      name: '!up or !time or !uptime',
      text: 'Stream duration'
    }, {
      name: '!old or !oldfag or !followage <username or empty>',
      text: 'Channel follow period'
    }, {
      name: '!ping',
      text: 'Game \'Ping Pong\''
    }, {
      name: '!size',
      text: 'Game \'Size\''
    }, {
      name: '!sr <youtube link>',
      text: 'Video request'
    }],
    mods: [{
      name: '!mute, !timeout <username> <duration or empty>',
      text: 'Timeout user'
    }, {
      name: '!ban, !permit <username> <reason or empty>',
      text: 'Permanent ban user'
    }, {
      name: '!unban <username>',
      text: 'Unban user'
    }, {
      name: '!skip',
      text: 'Skip played video'
    }, {
      name: '!game <full game name or short>',
      text: 'Set stream category. Short name is in the list below'
    }, {
      name: '!title <text>',
      text: 'Set stream name'
    }, {
      name: '!poll or !vote <Question | variant1 | variant2 | ...>',
      text: 'Create Strawpoll vote'
    }]
  }

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
                  {commands.all.map((item, index) => (
                    <div className="command_form" key={index}>
                      <input className="input_text command_name full" type="text" placeholder="Command" defaultValue={item.name} />
                      <input className="input_text command_text" type="text" placeholder="Description" defaultValue={item.text} />
                    </div>
                  ))}
                  <br></br>
                  <h4>For moderators and owner</h4>
                  {commands.mods.map((item, index) => (
                    <div className="command_form" key={index}>
                      <input className="input_text command_name full" type="text" placeholder="Command" defaultValue={item.name} />
                      <input className="input_text command_text" type="text" placeholder="Description" defaultValue={item.text} />
                    </div>
                  ))}
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
                        <input className="input_text command_name" type="text" placeholder="Short name" defaultValue={item.short} />
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
