import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navbarOpen: false
  }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/recommendations">
            <h1>iRecommend</h1>
          </Link>

          <a role="button" className={`navbar-burger${this.state.navbarOpen ? ' is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu${this.state.navbarOpen ? ' is-active' : ''}`}>
          <div className="navbar-end">
            <Link to="/users" className="navbar-item">Recommenders</Link>
            <Link to="/" className="navbar-item">Map</Link>
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
            {Auth.isAuthenticated() && <Link to="/logout" className="navbar-item">Logout</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
