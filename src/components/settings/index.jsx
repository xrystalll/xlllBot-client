import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiEndPoint, token } from 'config';
import { SettingItem } from './SettingItem';
import { Footer } from 'components/partials/Footer';
import { Loader } from 'components/partials/Loader';
import { Errorer } from 'components/partials/Error';
import { toast } from 'react-toastify';

const Settings = () => {
  const history = useHistory()

  const [items, setItems] = useState([])
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    document.title = 'xlllBot - Settings'
    const fetchSettings = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/settings/all', {
          headers: { Authorization: token }
        })
        if (data.status === 401) {
          localStorage.clear()
          toast.error('You are not authorized', { position: toast.POSITION.BOTTOM_RIGHT })
          history.push('/')
          return
        }
        const items = await data.json()

        if (items.length > 0) {
          setItems(items.sort((a, b) => a.sort - b.sort))
        } else {
          setNoData(true)
        }
      } catch(e) {
        setNoData(true)
        console.error(e)
      }
    }

    fetchSettings()
  }, [history])

  const toggleSetting = (name, e) => {
    const state = !e.currentTarget.parentNode.children[0].checked

    fetch(apiEndPoint + '/api/settings/toggle', {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, state })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          toast.success('Settings successfully saved', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to save settings', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm">
          <header className="content__header">
            <h2>Settings <small>Dashboard</small></h2>
          </header>

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <h4>Settings list</h4>
                <div id="content_inner">
                  {items.length > 0 ? (
                    items.map(item => (
                      <SettingItem key={item._id} data={item} toggleSetting={toggleSetting} />
                    ))
                  ) : (
                    !noData ? <Loader /> : <Errorer message="Settings not exists" />
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

export default Settings;
