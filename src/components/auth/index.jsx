import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export const Auth = (props) => {
  const history = useHistory()

  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'xlllBot - Log in'
    if (!!props.location.search && !!new URLSearchParams(props.location.search).get('sess')) {
      setError(false)
      localStorage.setItem('sessId', new URLSearchParams(props.location.search).get('sess'))
      setTimeout(() => window.close(), 2000)
    } else {
      setError(true)
      setTimeout(() => history.push('/'), 2000)
    }
  }, [error, history, props])

  return (
    <div className="content">
      <div className="authModal">
        {!error ? (
          <React.Fragment>
            <h2 className="success_title">Successfully logged in</h2>
            <div className="auth_text">You can now close this window.</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2 className="error_title">You are not authorized</h2>
            <div className="auth_form">
              <Link to="/" className="twitch_btn signin">Go to home page</Link>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}
