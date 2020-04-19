import React, { useState, useEffect } from 'react';
import { apiEndPoint, token } from 'config';
import Header from '../partials/Header';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Error } from '../partials/Error';
import { toast } from 'react-toastify';

const Badwords = () => {
  useEffect(() => {
    document.title = 'xlllBot - Badwords'
    fetchBadwords()
  }, [])

  const [showAdd, toggleAddState] = useState(false)

  const toggleAdd = () => {
    toggleAddState(!showAdd)
  }

  const [noData, setNoData] = useState(false)

  const [items, setItems] = useState([])

  const fetchBadwords = async () => {
    try {
      const data = await fetch(apiEndPoint + '/api/words/all', {
        headers: { Authorization: token }
      })
      const items = await data.json()
      if (items.length > 0) {
        items.reverse()
        setItems(items)
      } else {
        setNoData(true)
      }
    } catch(e) {
      console.error(e)
    }
  }

  const deleteBadword = (id, e) => {
    setItems(items.filter(items => items._id !== id))
    if (items.filter(items => items._id !== id).length === 0) {
      setItems([])
      setNoData(true)
    }
    fetch(apiEndPoint + '/api/words/delete?id=' + id, {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(() => toast.success('Badword successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(() => toast.error('Failed to delete badword', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const addBadword = (e) => {
    const el = e.currentTarget.closest('.command_form')
    const word = el.children[0].value
    const duration = el.children[1].value

    if (word.trim().length < 1) {
      toast.error('Enter name', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[0].classList.add('error')
    } else if (duration.trim().length < 1) {
      toast.error('Enter duration', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[0].classList.remove('error')
      el.children[1].classList.add('error')
    } else {
      el.children[0].classList.remove('error')
      el.children[1].classList.remove('error')

      fetch(apiEndPoint + `/api/words/add?word=${word.trim()}&duration=` + duration.trim(), {
        headers: { Authorization: token }
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            setNoData(false)
            setItems([data, ...items])
            toggleAdd()
            toast.success('Badword successfully added', { position: toast.POSITION.BOTTOM_RIGHT })
          } else throw Error('Failed to adding badword')
        })
        .catch(err => toast.error(err, { position: toast.POSITION.BOTTOM_RIGHT }))
    }
  }

  return (
    <>
      <Header />

      <section id="main">
        <section id="content">
          <div className="content--boxed-sm">
            <header className="content__header">
              <h2>Badwords <small>Dashboard</small></h2>
            </header>

            <div className="card">
              <div className="card__body">
                <div className="card__sub">
                  <h4>Badwords list</h4>
                  <div onClick={toggleAdd} className="item_add badword_add" title="Add new badword">
                    <i className="material-icons">add</i>
                  </div>
                  <div id="content_inner">

                    {showAdd ?
                      <div className="command_form">
                        <input className="input_text badword_name active" type="text" placeholder="Enter badword" />
                        <input className="input_text badword_duration active" type="number" placeholder="Enter ban duration" defaultValue="300" />
                        <div className="channel_actions">
                          <i onClick={toggleAdd} className="item_cancel badword_new_cancel material-icons" title="Cancel new badword">close</i>
                          <input onClick={addBadword.bind(this)} className="badword_create btn" type="submit" value="Add" />
                        </div>
                      </div>
                      : null}

                    {items.length > 0 ? (
                      items.map(item => (
                        <div className="command_form" key={item._id}>
                          <input className="input_text badword_name" type="text" placeholder="Badword" defaultValue={item.word} />
                          <input className="input_text badword_duration" type="text" placeholder="Ban duration" defaultValue={item.duration} />
                          <div className="channel_actions">
                            <i onClick={deleteBadword.bind(this, item._id)} className="item_delete badword_delete material-icons" title="Delete badword">delete</i>
                          </div>
                        </div>
                      ))
                    ) : (
                      !noData ? <Loader /> : <Error message="No badwords yet" />
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

export default Badwords;
