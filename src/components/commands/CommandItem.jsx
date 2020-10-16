import React, { useState } from 'react';
import { useForm } from 'hooks/useForm';
import { toast } from 'react-toastify';

export const CommandItem = ({ data, editCommand, deleteCommand }) => {
  const { values, handleChange } = useForm({ tag: '', text: '', countdown: data.countdown })

  const [editAction, toggleEditAction] = useState(false)
  const [errOne, setErrOne] = useState(false)
  const [errTwo, setErrTwo] = useState(false)
  const [errThree, setErrThree] = useState(false)

  const active = editAction ? ' active' : ''
  const errorOne = errOne ? ' error' : ''
  const errorTwo = errTwo ? ' error' : ''
  const errorThree = errThree ? ' error' : ''

  const changeEditState = () => {
    toggleEditAction(!editAction)
    setErrOne(false)
    setErrTwo(false)
    setErrThree(false)
  }

  const submit = (id, e) => {
    e.preventDefault()

    const tag = values.tag.trim().replace('!', '')
    const text = values.text.trim()

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
    } else if (values.countdown.length < 1) {
      toast.error('Enter countdown', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(false)
      setErrTwo(false)
      setErrThree(true)
    } else {
      setErrOne(false)
      setErrTwo(false)
      setErrThree(false)

      changeEditState()
      editCommand({ id, tag, text, countdown: values.countdown * 1 })
    }
  }

  return (
    <form className="command_form" onSubmit={submit.bind(this, data._id)}>
      <div className="command_prefix">!</div>
      <input
        className={'input_text command_name' + active + errorOne}
        type="text"
        name="tag"
        onChange={handleChange}
        placeholder="Enter command"
        defaultValue={data.tag}
      />
      <input
        className={'input_text command_text' + active + errorTwo}
        type="text"
        name="text"
        onChange={handleChange}
        placeholder="Enter text"
        defaultValue={data.text}
      />
      <input
        className={'input_text command_countdown' + active + errorThree}
        type="number"
        name="countdown"
        onChange={handleChange}
        placeholder="Enter countdown (seconds)"
        defaultValue={values.countdown}
      />
      <div className="command_actions">
        {!editAction ? (
          <div className="action_block">
            <i onClick={changeEditState} className="command_edit material-icons" title="Edit command">create</i>
            <i onClick={deleteCommand.bind(this, data._id)} className="item_delete command_delete material-icons" title="Delete command">delete</i>
          </div>
        ) : (
          <div className="action_block">
            <i onClick={changeEditState} className="item_cancel command_edit_cancel material-icons" title="Cancel changes">close</i>
            <input className="btn" type="submit" value="Save" />
          </div>
        )}
      </div>
    </form>
  )
}
