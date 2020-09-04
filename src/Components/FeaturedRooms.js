import React, { Component } from 'react';
import { roomContext, RoomContext } from '../context';

//
// Export
export default class FeaturedRooms extends Component {
  // First Way of Accessing Context: Alojamos el contenido
  static contextType = RoomContext;
  // LA MAGIA: PODEMOS ACCEDER A LA DATA, SIN TENER QUE PASAR POR APP-HOME-ETC...
  render() {
    const { featuredRooms: rooms } = this.context;
    console.log(rooms);
    return <div>from FeaturedRooms</div>;
  }
}
