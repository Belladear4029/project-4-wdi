import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class Navbar extends React.Component {

  state = {
    navbarOpen: false
  }

  componentDidMount() {
    axios({
      url: 'api/profile',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => console.log(this.state.currentUser));
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
            {/* {Auth.isAuthenticated() && <Link to={`/users/${this.state.currentUser._id}`} className="navbar-item">My Profile</Link>} */}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
            {Auth.isAuthenticated() && <Link to="/login" onClick={Auth.logout} className="navbar-item">Logout</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
