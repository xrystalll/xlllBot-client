import React, { useState, useEffect } from 'react';
import { apiEndPoint, token } from 'config';
import { Footer } from '../partials/Footer';
import { Loader } from '../partials/Loader';
import { Error } from '../partials/Error';
import { toast } from 'react-toastify';

const Commands = () => {
  useEffect(() => {
    document.title = 'xlllBot - Commands'
    fetchCommands()
  }, [])

  const [showAdd, toggleAddState] = useState(false)

  const toggleAdd = () => {
    toggleAddState(!showAdd)
  }

  const [noData, setNoData] = useState(false)

  const [items, setItems] = useState([])

  const fetchCommands = async () => {
    try {
      const data = await fetch(apiEndPoint + '/api/commands/all', {
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

  const deleteCommand = (id, e) => {
    setItems(items.filter(items => items._id !== id))
    if (items.filter(items => items._id !== id).length === 0) {
      setItems([])
      setNoData(true)
    }
    fetch(apiEndPoint + '/api/commands/delete?id=' + id, {
      headers: { Authorization: token }
    })
      .then(response => response.json())
      .then(() => toast.success('Command successfully deleted', { position: toast.POSITION.BOTTOM_RIGHT }))
      .catch(() => toast.error('Failed to delete command', { position: toast.POSITION.BOTTOM_RIGHT }))
  }

  const addCommand = (e) => {
    const el = e.currentTarget.closest('.command_form')
    const tag = el.children[1].value
    const text = el.children[2].value

    if (tag.trim().length < 1) {
      toast.error('Enter command tag', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[1].classList.add('error')
    } else if (text.trim().length < 1) {
      toast.error('Enter text', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[1].classList.remove('error')
      el.children[2].classList.add('error')
    } else {
      el.children[1].classList.remove('error')
      el.children[2].classList.remove('error')

      fetch(apiEndPoint + `/api/commands/add?tag=${tag.trim().replace('!', '')}&text=` + text.trim(), {
        headers: { Authorization: token }
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            setNoData(false)
            setItems([data, ...items])
            toggleAdd()
            toast.success('Command successfully added', { position: toast.POSITION.BOTTOM_RIGHT })
          } else throw Error('Failed to adding command')
        })
        .catch(err => {
          console.log(err)
          toast.error('Failed to adding command', { position: toast.POSITION.BOTTOM_RIGHT })
        })
    }
  }

  const editCommand = (id, e) => {
    const el = e.currentTarget.closest('.command_form')
    const tag = el.children[1].value
    const text = el.children[2].value

    if (tag.trim().length < 1) {
      toast.error('Enter command tag', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[1].classList.add('error')
    } else if (text.trim().length < 1) {
      toast.error('Enter text', { position: toast.POSITION.BOTTOM_RIGHT })
      el.children[1].classList.remove('error')
      el.children[2].classList.add('error')
    } else {
      el.children[1].classList.remove('error')
      el.children[2].classList.remove('error')

      toggleEditAction(e)
      fetch(apiEndPoint + `/api/commands/edit?id=${id}&tag=${tag.trim()}&text=` + text.trim(), {
        headers: { Authorization: token }
      })
        .then(response => response.json())
        .then(data => toast.success('Command successfully changed', { position: toast.POSITION.BOTTOM_RIGHT }))
        .catch(error => {
          console.log(err)
          toast.error('Failed to change command', { position: toast.POSITION.BOTTOM_RIGHT })
        })
    }
  }

  const toggleEditAction = (e) => {
    const el = e.currentTarget.closest('.command_form')
    el.children[1].classList.toggle('active')
    el.children[2].classList.toggle('active')
    el.children[3].children[0].classList.toggle('none')
    el.children[3].children[1].classList.toggle('none')
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

                  {showAdd ?
                    <div className="command_form">
                      <div className="command_prefix">!</div>
                      <input className="input_text command_name active" type="text" placeholder="Enter command" />
                      <input className="input_text command_text active" type="text" placeholder="Enter text" />
                      <div className="command_actions">
                        <i onClick={toggleAdd} className="item_cancel command_new_cancel material-icons" title="Chancel new command">close</i>
                        <input onClick={addCommand.bind(this)} className="command_create btn" type="submit" value="Add" />
                      </div>
                    </div>
                    : null}

                  {items.length > 0 ? (
                    items.map(item => (
                      <div className="command_form" key={item._id}>
                        <div className="command_prefix">!</div>
                        <input className="input_text command_name" type="text" placeholder="Enter command" defaultValue={item.tag} />
                        <input className="input_text command_text" type="text" placeholder="Enter text" defaultValue={item.text} />
                        <div className="command_actions">
                          <div className="action_block">
                            <i onClick={toggleEditAction.bind(this)} className="command_edit material-icons" title="Edit command">create</i>
                            <i onClick={deleteCommand.bind(this, item._id)} className="item_delete command_delete material-icons" title="Delete command">delete</i>
                          </div>

                          <div className="action_block none">
                            <i onClick={toggleEditAction.bind(this)} className="item_cancel command_edit_cancel material-icons" title="Cancel changes">close</i>
                            <input onClick={editCommand.bind(this, item._id)} className="command_save btn" type="submit" value="Save" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    !noData ? <Loader /> : <Error message="No commands yet" />
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
