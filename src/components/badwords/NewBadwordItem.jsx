import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const NewBadwordItem = ({ addBadword, toggleAdd }) => {
  const [errOne, setErrOne] = useState(false)
  const [errTwo, setErrTwo] = useState(false)

  const errorOne = errOne ? ' error' : ''
  const errorTwo = errTwo ? ' error' : ''

  const submit = (e) => {
    e.preventDefault()

    const el = e.currentTarget
    const word = el.children[0].value.trim().toLowerCase()
    const duration = el.children[1].value.trim()

    if (word.length < 1) {
      toast.error('Enter word', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(true)
      setErrTwo(false)
    } else if (duration.length < 1) {
      toast.error('Enter duration', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(false)
      setErrTwo(true)
    } else {
      addBadword({ word, duration: duration * 1 })
    }
  }

  return (
    <form className="command_form" onSubmit={submit.bind(this)}>
      <input className={'input_text badword_name active' + errorOne} type="text" placeholder="Enter badword" />
      <input className={'input_text badword_duration active' + errorTwo} type="number" placeholder="Enter ban duration (seconds)" defaultValue="300" />
      <div className="channel_actions">
        <i onClick={toggleAdd} className="item_cancel badword_new_cancel material-icons" title="Cancel new badword">close</i>
        <input className="btn" type="submit" value="Add" />
      </div>
    </form>
  )
}
