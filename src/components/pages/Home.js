import React from 'react';

import GoogleMap from '../common/GoogleMap';

const Home = () => {
  return (
    <main>
      <h1>Find recommendations</h1>
      <input className="input" placeholder="Enter a city..."/>
      <GoogleMap />
    </main>
  );
};

export default Home;
