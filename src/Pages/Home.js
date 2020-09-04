import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';

// Main:
export default function Home() {
  return (
    <Hero>
      <Banner title='Luxurious ROoms' subtitle='Deluxe rooms from $250'>
        <Link to='/rooms' className='btn-primary'>
          Our Rooms
        </Link>
      </Banner>
    </Hero>
  );
}
