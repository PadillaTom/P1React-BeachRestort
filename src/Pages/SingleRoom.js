import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';

// Main:
export default class SingleRoom extends Component {
  // Acceder a SLUG:
  constructor(props) {
    super(props);
    // console.log(this.props); // Vemos los Props(match->params->slug) de la ROOM clickeada (featured)
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
    };
  }
  // Acceder al CONTEXT API:
  static contextType = RoomContext;

  componentDidMount() {}

  // Render
  render() {
    // Destructure el Context:
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug); // Pedimos la ROOM pasando el SLUG aqui obtenido
    // console.log(room); // Vemos que nos muestra una ROOM y si no hay ROOM: Undefined.
    if (!room) {
      return (
        <div className='error'>
          <h3>No Such Room...</h3>
          <Link to='/rooms' className='btn-primary'>
            Back to Rooms
          </Link>
        </div>
      );
    } // ELSE ----> DESTRUCTURAMOS EL OBJECT ROOM: para tomar la info deseada y display it
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room;
    // LUEGO QUEREMOS CAMBIAR LA IMGCG, NECESIAMOS STYLED COMPONENTS
    return (
      <Hero hero='roomsHero'>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            Back to Rooms
          </Link>
        </Banner>
      </Hero>
    );
  }
}
