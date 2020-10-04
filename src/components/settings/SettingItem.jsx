import React from 'react';

export const SettingItem = ({ data, toggleSetting }) => {
  return (
    <div className="md-checkbox">
      <input id={data.name} type="checkbox" defaultChecked={data.state} />
      <label htmlFor={data.name} onClick={toggleSetting.bind(this)} className="setting_item">
        <span>{data.description}</span>
      </label>
    </div>
  )
}
