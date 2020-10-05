import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiEndPoint, token } from 'config';
import { NewBadwordItem } from './NewBadwordItem';
import { BadwordItem } from './BadwordItem';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Errorer } from '../partials/Error';
import { toast } from 'react-toastify';

const Badwords = () => {
  const history = useHistory()

  const [showAdd, toggleAddState] = useState(false)
  const [noData, setNoData] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    document.title = 'xlllBot - Badwords'
    const fetchBadwords = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/words/all', {
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
          items.reverse()
          setItems(items)
        } else {
          setNoData(true)
        }
      } catch(e) {
        setNoData(true)
        console.error(e)
      }
    }

    fetchBadwords()
  }, [history])

  const toggleAdd = () => {
    toggleAddState(!showAdd)
  }

  const deleteBadword = (id) => {
    fetch(apiEndPoint + '/api/words/delete', {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setItems(items.filter(item => item._id !== id))
          if (items.filter(item => item._id !== id).length === 0) {
            setItems([])
            setNoData(true)
          }
          toast.success('Badword successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to delete badword', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const addBadword = (props) => {
    fetch(apiEndPoint + '/api/words/add', {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setNoData(false)
          setItems([data, ...items])
          toggleAdd()
          toast.success('Badword successfully added', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to adding badword', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  return (
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
                  <i className="material-icons">{showAdd ? 'close' : 'add'}</i>
                </div>
                <div id="content_inner">

                  {showAdd && <NewBadwordItem addBadword={addBadword} toggleAdd={toggleAdd} />}

                  {items.length > 0 ? (
                    items.map(item => (
                      <BadwordItem
                        key={item._id}
                        data={item}
                        deleteBadword={deleteBadword}
                      />
                    ))
                  ) : (
                    !noData ? <Loader /> : <Errorer message="No badwords yet" />
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

export default Badwords;
