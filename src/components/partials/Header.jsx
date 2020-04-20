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

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick.bind(this), false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this), false)
  }

  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  closeMenu() {
    this.setState({
      showMenu: false
    })
  }

  handleOutsideClick(e) {
    if (!e.target.closest('.open')) {
      this.closeMenu()
    }
  }

  render() {
    const { channel, logo } = this.state
    const menuVis = this.state.showMenu ? 'open' : '';
    return (
      <>
        <header id="header" className={menuVis}>
          <div className="logo">
            <i onClick={this.toggleMenu.bind(this)} className="logo__trigger material-icons">menu</i>
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
                <NavLink exact to="/" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">home</i>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/channel" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">person</i>
                  Channel
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/commands" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">format_list_bulleted</i>
                  Commands
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/badwords" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">voice_over_off</i>
                  Badwords
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/songs" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">playlist_play</i>
                  Stream Dj
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/events" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">playlist_add_check</i>
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/settings" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">settings</i>
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
      </>
    )
  }
}

export default Header;
