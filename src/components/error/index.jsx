import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  useEffect(() => {
    document.title = 'xlllBot - 404 Not Found'
  }, [])

  return (
    <div className="authModal">
      <h2>404 Not Found</h2>
      <div className="auth_form">
        <Link to="/" className="twitch_btn signin">Go to home page</Link>
      </div>
    </div>
  )
}
