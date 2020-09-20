import React, { useState, useEffect } from 'react';
import { apiEndPoint, token } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { toast } from 'react-toastify';

const Settings = () => {
  useEffect(() => {
    document.title = 'xlllBot - Settings'
    fetchSettings()
  }, [])

  const [items, setItems] = useState([])

  const fetchSettings = async () => {
    try {
      const data = await fetch(apiEndPoint + '/api/settings/all', {
        headers: { Authorization: token }
      })
      const items = await data.json()

      setItems(items)
    } catch(e) {
      console.error(e)
    }
  }

  const toggleSetting = (e) => {
    const name = e.currentTarget.htmlFor
    const checkState = !e.currentTarget.parentNode.children[0].checked
    fetch(apiEndPoint + `/api/settings?name=${name}&state=` + checkState, {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(() => toast.success('Settings successfully saved', { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(() => toast.error('Failed to save settings', { position: toast.POSITION.BOTTOM_RIGHT }))
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
                      <div className="md-checkbox" key={item._id}>
                        <input id={item.name} type="checkbox" defaultChecked={item.state} />
                        <label htmlFor={item.name} onClick={toggleSetting.bind(this)} className="setting_item">
                          <span>{item.description}</span>
                        </label>
                      </div>
                    ))
                  ) : <Loader />}
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
