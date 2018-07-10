import React from 'react';
import axios from 'axios';

class UsersIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }

  render() {
    return (
      <main>
        <h1 className="title is-2">Recommenders</h1>
        <div className="columns is-multiline">
          {this.state.users.map(user =>
            <div key={user._id} className="column">
              <img src={user.image} alt={user.firstName} />
              <h1 className="title is-5">{user.firstName} {user.lastName}</h1>
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default UsersIndex;
