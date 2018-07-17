/* global describe, it, beforeEach, before, after */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import sinon from 'sinon';
import axios from 'axios';
import Promise from 'bluebird';

import CitiesShow from '../../../src/components/cities/Show';

const data = {
  _id: 1,
  name: 'Barcelona',
  country: 'Spain',
  location: { lat: 41.3851, lng: 2.1734 },
  language: 'Spanish'
};

xdescribe('CitiesShow tests', () => {
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
      <MemoryRouter initialEntries={['/cities/1']}>
        <Route path="/cities/:id" components={CitiesShow} />
      </MemoryRouter>
    );
    done();
  });

  it('should render the correct data', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('h1').text()).to.eq(data.name + ', ' + data.country);
      done();
    });
  });
});
