import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { apiEndPoint, token } from 'config';
import { NewCommandItem } from './NewCommandItem';
import { CommandItem } from './CommandItem';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Errorer } from '../partials/Error';
import { toast } from 'react-toastify';

const Commands = () => {
  const history = useHistory()

  const [showAdd, toggleAddState] = useState(false)
  const [noData, setNoData] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    document.title = 'xlllBot - Commands'
    const fetchCommands = async () => {
      try {
        const data = await fetch(apiEndPoint + '/api/commands/all', {
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

    fetchCommands()
  }, [history])

  const toggleAdd = () => {
    toggleAddState(!showAdd)
  }

  const deleteCommand = (id) => {
    setItems(items.filter(item => item._id !== id))
    if (items.filter(item => item._id !== id).length === 0) {
      setItems([])
      setNoData(true)
    }
    fetch(apiEndPoint + '/api/commands/delete', {
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
          toast.success('Command successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to delete command', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const addCommand = (props) => {
    fetch(apiEndPoint + '/api/commands/add', {
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
          toast.success('Command successfully added', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to adding command', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const editCommand = (props) => {
    fetch(apiEndPoint + '/api/commands/edit', {
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
          toast.success('Command successfully changed', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to change command', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  return (
    <section id="main">

      <section id="content">
        <div className="content--boxed-sm">
          <header className="content__header">
            <h2>Commands <small>Dashboard</small></h2>
          </header>

          <div className="card">
            <div className="card__body">
              <div className="card__sub">
                <h4>Commands list</h4>
                <div onClick={toggleAdd} className="item_add command_add" title="Add new command">
                  <i className="material-icons">add</i>
                </div>
                <div id="content_inner">

                  {showAdd && <NewCommandItem addCommand={addCommand} toggleAdd={toggleAdd} />}

                  {items.length > 0 ? (
                    items.map(item => (
                      <CommandItem
                        key={item._id}
                        data={item}
                        editCommand={editCommand}
                        deleteCommand={deleteCommand}
                      />
                    ))
                  ) : (
                    !noData ? <Loader /> : <Errorer message="No commands yet" />
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

export default Commands;
