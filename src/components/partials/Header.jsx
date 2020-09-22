import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CustomScrollbar from '../support/CustomScrollbar';
import { channel } from 'config';

class Header extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.isAuth = !!localStorage.getItem('sessId') && !!localStorage.getItem('userLogin')
    this.state = {
      showMenu: false,
      channel,
      logo: localStorage.getItem('userLogo')
    }
  }

  componentDidMount() {
    this._isMounted = true
    document.addEventListener('click', this.handleOutsideClick.bind(this), false)
  }

  componentWillUnmount() {
    this._isMounted = false
    document.removeEventListener('click', this.handleOutsideClick.bind(this), false)
  }

  toggleMenu() {
    if (!this._isMounted) return

    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  closeMenu() {
    if (!this._isMounted) return

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
    const menuVis = this.state.showMenu ? 'open' : ''

    return (
      <>
        <header id="header" className={menuVis}>
          <div className="logo">
            <i onClick={this.toggleMenu.bind(this)} className="logo__trigger material-icons">menu</i>
            <h1>xlllBot</h1>
          </div>

          {this.isAuth && (
            <ul className="top-menu">
              <li className="top-menu__profile">
                <Link to="/dashboard/channel">
                  <span className="userName">{channel || ''}</span>
                  <div className="userPhoto"  style={{ 'backgroundImage': `url(${logo})` }}></div>
                </Link>
              </li>
            </ul>
          )}
        </header>

        <aside id="navigation" className={menuVis}>
          <CustomScrollbar className="navigation__menu">
            <ul>
              <li>
                <NavLink exact to="/" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">home</i>
                  Home
                </NavLink>
              </li>
              {this.isAuth && (
                <React.Fragment>
                  <li>
                    <NavLink to="/dashboard/channel" onClick={this.closeMenu.bind(this)}>
                      <i className="material-icons">person</i>
                      Channel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/commands" onClick={this.closeMenu.bind(this)}>
                      <i className="material-icons">list</i>
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
                </React.Fragment>
              )}
              <li>
                <NavLink to="/commands" onClick={this.closeMenu.bind(this)}>
                  <i className="material-icons">list</i>
                  All commands
                </NavLink>
              </li>
            </ul>
          </CustomScrollbar>
        </aside>
      </>
    )
  }
}

export default Header;
