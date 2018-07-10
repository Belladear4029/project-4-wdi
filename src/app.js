import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import CitiesShow from './components/cities/Show';
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';

import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route path="/cities/:id" component={CitiesShow}/>
                <Route path="/users/:id" component={UsersShow}/>
                <Route path="/users" component={UsersIndex}/>
              </Switch>
            </div>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
