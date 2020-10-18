import React from 'react';

export const Card = ({ title, action, className, children }) => {
  return (
    <div className="card">
      <div className="card__body">
        <div className="card__sub">
          {!!title && <h4>{title}</h4>}
          {!!action && action}
          <div className={'content_inner ' + className}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
