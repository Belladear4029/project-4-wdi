import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import _ from 'lodash';

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
      return re.test(user.name);
    });
  }

  render() {
    return (
      <main>
        <h1 className="title is-2">Recommenders</h1>

        <div className="filters">
          <input className="input" placeholder="Search" onChange={this.handleSearch} />
        </div>

        <div className="columns is-multiline">
          {this.filteredUsers().map(user =>
            <div key={user._id} className="column">
              <Link to={`/users/${user._id}`}>
                <div className="card">
                  <div className="card-image">
                    <img src={user.image} alt={user.firstName} />
                  </div>
                  <div className="card-content">
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
