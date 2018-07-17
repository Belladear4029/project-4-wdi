/* global describe, it, beforeEach, before, after */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';

import UsersShow from '../../../src/components/users/Show';

const data = {
  _id: 1,
  firstName: 'Bella',
  lastName: 'Dear',
  image: 'https://media.licdn.com/dms/image/C5603AQFDdL6vOSb3MQ/profile-displayphoto-shrink_200_200/0?e=1536796800&v=beta&t=GVJ-vx4KRpHOZEUqOYb9ID3VOV6lTCtFHJpdXu-oEGo.jpg',
  email: 'bella@bella.com',
  password: 'bella',
  passwordConfirmation: 'bella'
};

xdescribe('UsersShow tests', () => {
  let promise;
  let wrapper;

  before(done => {
    promise = Promise.resolve({ data });
    sinon.stub(axios, 'get').returns(promise);
    done();
  });

  after(done => {
    axios.get.restore();
    done();
  });

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/users/1']}>
        <Route path="/users/:id" component={UsersShow} />
      </MemoryRouter>
    );
    done();
  });

  it('should render a user', done => {
    promise.then(() => {
      wrapper.update();
      console.log(wrapper.debug());
      expect(wrapper.find('div').length).to.eq(1);
      done();
    });
  });

  // it('should render the correct data', done => {
  //   promise.then(() => {
  //     wrapper.update();
  //     console.log(wrapper.debug());
  //     expect(wrapper.find('img.user-image').prop('src')).to.eq(data.image);
  //     done();
  //   });
  // });
});
