import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UsersIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      sort: 'name|asc'
    };

  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  filteredUsers = () => {
    const re = new RegExp(this.state.search, 'i');
    return this.state.users.filter(user => {
      return re.test(user.firstName) || re.test(user.lastName);
    });
  }

  render() {
    return (
      <main>
        <h1 className="title is-2">Recommenders</h1>

        <div className="search">
          <input className="input" placeholder="Search" onChange={this.handleSearch} />
        </div>

        <div className="columns is-multiline">
          {this.filteredUsers().map(user =>
            <div key={user._id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
              <Link to={`/users/${user._id}`}>
                <div className="user-card">
                  <div className="card-image is-centered">
                    <img className="user-image" src={user.image} alt={user.firstName} />
                  </div>
                  <div className="card-content is-centered">
                    <h1 className="title is-5">{user.firstName} {user.lastName}</h1>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default UsersIndex;
