import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';

// Main
const Rooms = () => {
  return (
    <Hero hero='roomsHero'>
      <Banner title='Our Rooms'>
        <Link to='/' className='btn-primary'>
          Back to Main Page
        </Link>
      </Banner>
    </Hero>
  );
};

export default Rooms;
