import React, { useEffect }  from 'react';

export const Auth = () => {
  useEffect(() => {
    document.title = 'xlllBot - Log in'
  }, [])

  return (
    <div className="authModal">
      <h2 className="success_title">Successfully logged in</h2>
      <div className="auth_text">You can now close this window.</div>
    </div>
  )
}
