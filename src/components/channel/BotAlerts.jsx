import React from 'react';
import { Card } from 'components/partials/Card';

export const BotModerator = ({ botUsername }) => {
  return (
    <Card className="general">
      <div className="error_title">
        <div className="alert_info">
          <i className="material-icons-outlined">error_outline</i>
          {botUsername} не является модератором в чате!
        </div>
      </div>
    </Card>
  )
}

export const BotActive = ({ state, botUsername, changeActive }) => {
  return (
    <Card className="general">
      <div className={state ? 'success_title' : 'error_title'}>
        <div className="alert_info">
          <i className="material-icons-outlined">error_outline</i>
          <label className="switch">
            <input type="checkbox" onChange={changeActive.bind(this)} checked={state} />
            <span>
              {state ? `${botUsername} подключен к чату` : `${botUsername} не активен! Нажмите чтобы активировать`}
            </span>
          </label>
        </div>
      </div>
    </Card>
  )
}
