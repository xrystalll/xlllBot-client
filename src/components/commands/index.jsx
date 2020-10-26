import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie, clearCookies } from 'components/support/Utils';
import { apiEndPoint } from 'config';
import { NewCommandItem } from './NewCommandItem';
import { CommandItem } from './CommandItem';
import { Card } from 'components/partials/Card';
import { Footer } from 'components/partials/Footer';
import { Loader } from 'components/partials/Loader';
import { Errorer } from 'components/partials/Error';
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
          headers: {
            Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token'))
          }
        })
        if (data.status === 401) {
          clearCookies()
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
    fetch(apiEndPoint + '/api/commands/delete', {
      method: 'PUT',
      headers: {
        Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token')),
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
          toast.success('Command successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT })
        } else throw Error(data.error)
      })
      .catch(err => toast.error(err ? err.message : 'Failed to delete command', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const addCommand = (props) => {
    fetch(apiEndPoint + '/api/commands/add', {
      method: 'PUT',
      headers: {
        Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token')),
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
        Authorization: 'Basic ' + btoa(getCookie('login') + ':' + getCookie('token')),
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

          <Card title="Commands list" className="general" action={
            <div onClick={toggleAdd} className="item_add command_add" title="Add new command">
              <i className="material-icons">{showAdd ? 'close' : 'add'}</i>
            </div>
          }>
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
          </Card>

        </div>
      </section>

      <Footer />

    </section>
  )
}

export default Commands;
