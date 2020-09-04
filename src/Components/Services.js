import React, { Component } from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

export default class Services extends Component {
  // State:
  state = {
    services: [
      {
        icon: <FaCocktail></FaCocktail>,
        title: 'Free Cocktails',
        info:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Quas, asperiores!',
      },
      {
        icon: <FaHiking></FaHiking>,
        title: 'Endless Hiking',
        info:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Quas, asperiores!',
      },
      {
        icon: <FaBeer></FaBeer>,
        title: 'Free Beer',
        info:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Quas, asperiores!',
      },
      {
        icon: <FaShuttleVan></FaShuttleVan>,
        title: 'Free Shuttle',
        info:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Quas, asperiores!',
      },
    ],
  };

  // Render:
  render() {
    return (
      <section className='services'>
        <Title title='Services'></Title>
        <div className='services-center'>
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className='service'>
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
