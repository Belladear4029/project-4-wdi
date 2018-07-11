import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import CitiesShow from './components/cities/Show';
import RecommendationsNew from './components/recommendations/New';
import UsersIndex from './components/users/Index';
import UsersShow from './components/users/Show';
import UsersEdit from './components/users/Edit';

import 'bulma';
import './scss/style.scss';

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
                <Route path="/recommendations" component={RecommendationsNew}/>
                <Route path="/cities/:id" component={CitiesShow}/>
                <Route path="/users/:id/edit" component={UsersEdit}/>
                <Route path="/users/:id" component={UsersShow}/>
                <Route path="/users" component={UsersIndex}/>
                <Route path="/register" component={AuthRegister}/>
                <Route path="/login" component={AuthLogin}/>
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
