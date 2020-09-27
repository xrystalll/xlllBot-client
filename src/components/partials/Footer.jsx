import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const isAuth = !!localStorage.getItem('sessId') && !!localStorage.getItem('userLogin')

  const logout = () => {
    localStorage.clear()
  }

  return (
    <footer className="content--boxed-sm" id="footer">
      <div className="other_copy">xlllBot 2020 <a href={'https://github.com/xrystalll'} target="_blank" rel="noopener noreferrer">by xrystalll</a></div>

      {isAuth && (
        <ul className="footer__menu">
          <li>
            <Link to="/">Home</Link>
          </li>
            <li>
              <Link to="/dashboard/commands">Commands</Link>
            </li>
            <li>
              <Link to="/dashboard/badwords">Badwords</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">Settings</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>Log out</Link>
            </li>
        </ul>
      )}
    </footer>
  )
}
