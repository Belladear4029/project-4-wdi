import React from 'react';

import GoogleMap from '../common/GoogleMap';
import GoogleAutocomplete from '../common/GoogleAutocomplete';

const Home = () => {
  return (
    <main>
      <h1>Find recommendations</h1>
      <GoogleAutocomplete placeholder="Search a Country or City..."/>
      <GoogleMap />
    </main>
  );
};

export default Home;
