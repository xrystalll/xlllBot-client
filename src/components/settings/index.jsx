import React, { useState, useEffect } from 'react';
import conf from 'config.json';
import Header from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { toast } from 'react-toastify';

const token = 'Basic ' + btoa(`xlllClient:${localStorage.getItem('userHash')}`)
const Settings = () => {
  useEffect(() => {
    document.title = 'xlllBot - Settings'
    fetchSettings()
  }, [])

  const [items, setItems] = useState([])

  const fetchSettings = async () => {
    try {
      const data = await fetch(`${conf.apiEndPoint}/api/settings/all`, {
        headers: new Headers({ 'Authorization': token })
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
    fetch(`${conf.apiEndPoint}/api/settings?name=${name}&state=${checkState}`, {
      headers: new Headers({ 'Authorization': token })
    })
      .then(response => response.json())
      .then(data => toast.success('Settings successfully saved', { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(error => toast.error('Failed to save settings', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  return (
    <>
      <Header />

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
                          <input id={item.name} type="checkbox" value="true" defaultChecked={item.state} />
                          <label className="setting_item" htmlFor={item.name} onClick={toggleSetting.bind(this)}>
                            <span>{item.description}</span>
                          </label>
                        </div>
                      ))
                    ) : (
                      <Loader />
                    )}
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

export default Settings;
