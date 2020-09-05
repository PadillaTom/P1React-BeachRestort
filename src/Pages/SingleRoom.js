import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../Components/StyledHero';

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
    // LUEGO QUEREMOS CAMBIAR LA IMGBG, NECESIAMOS STYLED COMPONENTS
    // Destructure Images Array (para poder mostrarlas individualmente)
    const [mainImg, ...defaultImg] = images; // Las pasaremos como Main y el resto como Default
    return (
      <React.Fragment>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className='btn-primary'>
              Back to Rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className='single-room'>
          <div className='single-room-images'>
            {defaultImg.map((img, index) => {
              return <img key={index} src={img} alt={name}></img>;
            })}
          </div>
          <div className='single-room-info'>
            <article className='descri'>
              <h3>Details</h3>
              <p>{description}</p>
            </article>
            <article className='info'>
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>sizee: {size} SqFt</h6>
              <h6>
                max capacity:
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? 'Pet Friendly' : null}</h6>
              <h6>{breakfast && 'free Breakfast'}</h6>
            </article>
          </div>
        </section>
        <section className='room-extras'>
          <h6>extras</h6>
          <ul className='extras'>
            {extras.map((item, index) => {
              return <li key={index}> - {item}</li>;
            })}
          </ul>
        </section>
      </React.Fragment>
    );
  }
}
