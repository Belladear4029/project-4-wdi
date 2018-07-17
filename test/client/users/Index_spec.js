/* global describe, it, beforeEach, before, after */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';
import _ from 'lodash';

import UsersIndex from '../../../src/components/users/Index';

const data = [{
  firstName: 'Bella',
  lastName: 'Dear',
  image: 'https://media.licdn.com/dms/image/C5603AQFDdL6vOSb3MQ/profile-displayphoto-shrink_200_200/0?e=1536796800&v=beta&t=GVJ-vx4KRpHOZEUqOYb9ID3VOV6lTCtFHJpdXu-oEGo',
  email: 'bella@bella.com',
  password: 'bella',
  passwordConfirmation: 'bella'
}, {
  firstName: 'Josh',
  lastName: 'Storm',
  image: 'https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/1554/thumb_Gerry_2_240x240.jpg',
  email: 'josh@josh.com',
  password: 'josh',
  passwordConfirmation: 'josh'
}, {
  firstName: 'James',
  lastName: 'Newell',
  image: 'https://media.licdn.com/dms/image/C4D03AQHazaIQs2xaYQ/profile-displayphoto-shrink_200_200/0?e=1535587200&v=beta&t=D57hH_MeggXFnIW7n98oGzfrPcnRfUyKbdFCviN6F9o',
  email: 'james@james.com',
  password: 'james',
  passwordConfirmation: 'james'
}, {
  firstName: 'Bianca',
  lastName: 'Jemsten',
  image: 'https://media.licdn.com/dms/image/C5603AQGP8ydXXjyNfw/profile-displayphoto-shrink_200_200/0?e=1535587200&v=beta&t=LWRubHnaKF4b7smqh27er3vnUFtcf6UxgwiF7A8sS2A',
  email: 'bianca@bianca.com',
  password: 'bianca',
  passwordConfirmation: 'bianca'
}];

describe('UsersIndex test', () => {
  let wrapper;
  let promise;

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
      <MemoryRouter>
        <UsersIndex />
      </MemoryRouter>
    );
    done();
  });

  it('should render users', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('div.user-card').length).to.eq(4);
      done();
    })
      .catch(done);
  });

  it('should render correct data', done => {
    promise.then(() => {
      wrapper.update();

      _.orderBy(data, 'name', 'asc').forEach((user, index) => {
        expect(wrapper.find('img').at(index).prop('src')).to.eq(user.image);
        expect(wrapper.find('h1.title.is-5').at(index).text()).to.eq(user.firstName + ' ' + user.lastName);
        expect(wrapper.find('Link').at(index).prop('to')).to.eq(`/users/${user._id}`);
      });
      done();
    })
      .catch(done);
  });

  it('should filter the users', done => {
    const input = wrapper.find('input');
    promise.then(() => {
      input.simulate('change', { target: { value: 'Bella'} });
      wrapper.update();
      expect(wrapper.find('div.user-card').length).to.eq(1);

      input.simulate('change', { target: { value: 'B'} });
      wrapper.update();
      expect(wrapper.find('div.user-card').length).to.eq(2);

      input.simulate('change', { target: { value: 'garbage'} });
      wrapper.update();
      expect(wrapper.find('div.card').length).to.eq(0);

      done();
    })
      .catch(done);
  });




});
