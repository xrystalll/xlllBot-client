import React, { useState } from 'react';
import { useForm } from 'hooks/useForm';
import { toast } from 'react-toastify';

export const SettingValueItem = ({ data, setValueSetting }) => {
  const { values, handleChange } = useForm({ value: data.value })

  const [err, setErr] = useState(false)

  const error = err ? ' error' : ''

  const submit = (name, e) => {
    e.preventDefault()

    if (values.value.length < 1) {
      toast.error('Enter price value', { position: toast.POSITION.BOTTOM_RIGHT })
      setErrOne(true)
    } else {
      setErrOne(false)

      setValueSetting({ name, state: false, value: values.value * 1 })
    }
  }

  return (
    <form className="md-checkbox" onSubmit={submit.bind(this, data.name)}>
      <div className="setting_description">{data.description}</div>
      <div className="set_setting_value">
        <input
          className={'input_text active' + error}
          type="text"
          name="value"
          onChange={handleChange}
          placeholder="Enter price"
          defaultValue={data.value}
        />
        <input className="btn" type="submit" value="Save" />
      </div>
    </form>
  )
}
