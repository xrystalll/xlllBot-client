import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { channel } from 'config';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      channel,
      logo: localStorage.getItem('userLogo')
    }
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {
    const { channel, logo } = this.state
    const menuVis = this.state.showMenu ? 'open' : '';
    return (
      <>
        <header id="header" className={menuVis}>
          <div className="logo">
            <i id="menu_toggle" className="logo__trigger material-icons" onClick={this.toggleMenu.bind(this)}>menu</i>
            <h1>xlllBot</h1>
          </div>

          <ul className="top-menu">
            <li className="top-menu__profile">
              <Link to="/dashboard/channel">
                <span className="userName">{channel || ''}</span>
                <img className="userPhoto" src={logo || ''} alt="" />
              </Link>
            </li>
          </ul>
        </header>

        <aside id="navigation" className={menuVis}>
          <div className="navigation__menu c-overflow">
            <ul>
              <li>
                <NavLink exact to="/"><i className="material-icons">home</i> Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/channel"><i className="material-icons">person</i> Channel</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/commands"><i className="material-icons">format_list_bulleted</i> Commands</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/badwords"><i className="material-icons">voice_over_off</i> Badwords</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/songs"><i className="material-icons">playlist_play</i> Stream Dj</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/events"><i className="material-icons">playlist_add_check</i> Events</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/settings"><i className="material-icons">settings</i> Settings</NavLink>
              </li>
            </ul>
          </div>
        </aside>
      </>
    )
  }
}

export default Header;
