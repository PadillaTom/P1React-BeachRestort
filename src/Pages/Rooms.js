import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';
import RoomContainer from '../Components/RoomContainer';
// Main
const Rooms = () => {
  return (
    <React.Fragment>
      <Hero hero='roomsHero'>
        <Banner title='Our Rooms'>
          <Link to='/' className='btn-primary'>
            Back to Main Page
          </Link>
        </Banner>
      </Hero>
      <RoomContainer></RoomContainer>
    </React.Fragment>
  );
};

export default Rooms;
