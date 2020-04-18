import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="content--boxed-sm" id="footer">
      <div className="other_copy">xlllBot 2020 <a href={'https://github.com/xrystalll'} target="_blank" rel="noopener noreferrer">by xrystalll</a></div>

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
      </ul>
    </footer>
  )
}
