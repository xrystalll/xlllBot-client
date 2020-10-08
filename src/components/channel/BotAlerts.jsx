import React from 'react';

export const BotModerator = ({ botUsername }) => {
  return (
    <div className="card">
      <div className="card__body">
        <div className="card__sub">
          <div className="error_title">
            <div className="alert_info">
              <i className="material-icons-outlined">error_outline</i>
              {botUsername} не является модератором в чате!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BotActive = ({ state, botUsername, changeActive }) => {
  return (
    <div className="card">
      <div className="card__body">
        <div className="card__sub">
          <div className={state ? 'success_title' : 'error_title'}>
            <div className="alert_info">
              <i className="material-icons-outlined">error_outline</i>
              <label className="switch">
                <input type="checkbox" onChange={changeActive.bind(this)} checked={state} />
                <span>
                  {!state ? `${botUsername} не активен! Нажмите чтобы активировать` : `${botUsername} подключен к чату`}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
