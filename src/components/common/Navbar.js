import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  state = {}

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1>iRecommend</h1>
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to="/users" className="navbar-item">Recommenders</Link>
            <Link to="/" className="navbar-item">Map</Link>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
            <Link to="/logout" className="navbar-item">Logout</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
