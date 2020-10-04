import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const NewCommandItem = ({ addCommand, toggleAdd }) => {
  const [errOne, setErrOne] = useState(false)
  const [errTwo, setErrTwo] = useState(false)
  const [errThree, setErrThree] = useState(false)

  const errorOne = errOne ? ' error' : ''
  const errorTwo = errTwo ? ' error' : ''
  const errorThree = errThree ? ' error' : ''

  const submit = (e) => {
    e.preventDefault()

    const el = e.currentTarget
    const tag = el.children[1].value.trim().replace('!', '')
    const text = el.children[2].value.trim()
    const countdown = el.children[3].value.trim()

    if (tag.length < 1) {
      toast.error('Enter command tag', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(true)
      setErrTwo(false)
      setErrThree(false)
    } else if (text.length < 1) {
      toast.error('Enter text', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(false)
      setErrTwo(true)
      setErrThree(false)
    } else if (countdown.length < 1) {
      toast.error('Enter countdown', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(false)
      setErrTwo(false)
      setErrThree(true)
    } else {
      addCommand({ tag, text, countdown: countdown * 1 })
    }
  }

  return (
    <form className="command_form" onSubmit={submit.bind(this)}>
      <div className="command_prefix">!</div>
      <input className={'input_text command_name active' + errorOne} type="text" placeholder="Enter command" />
      <input className={'input_text command_text active' + errorTwo} type="text" placeholder="Enter text" />
      <input className={'input_text command_countdown active' + errorThree} type="number" placeholder="Enter countdown (seconds)" defaultValue="0" />
      <div className="command_actions">
        <i onClick={toggleAdd} className="item_cancel command_new_cancel material-icons" title="Chancel new command">close</i>
        <input className="btn" type="submit" value="Add" />
      </div>
    </form>
  )
}
