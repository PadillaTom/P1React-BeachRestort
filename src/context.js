// :::::::::::: CONTEXT API :::::::::::::::::::

import React, { Component } from 'react';
import items from './data';
// ALojamos el Create Context
const RoomContext = React.createContext();
// Tenemos Acceso a
// PROVIDER ---> Allows all components to access it : <RoomContext.Provider value={}
// Tengo que asegurarme que los CHILDREN tengan acceso.
// CONSUMER ---> Used to access the information
//
//
//
// Main: Cambiamos el nombre a ROOM PROVIDER
class RoomProvider extends Component {
  // State: Sacado de DATA.js
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
  };
  //
  // Get Data:

  // Once we have data:
  componentDidMount() {
    let rooms = this.formatData(items);
    // console.log(rooms); // Una vez escrita toda la funcion: Vemos el Array
    let featuredRooms = rooms.filter((room) => room.featured === true);
    // console.log(featuredRooms); // Comprobamos
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
    });
  }
  // Format Data: Para facil acceso, Comenzamos destructurando la DATA
  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url); // Iteramos cada Image destructurando
      //
      // Queremos guardar todo en ROOM.
      // 1- Creamos un object que contenga TODO(item.fields)
      // 2- images del object sea igual a mi images mapeado
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  // Get Room: Usaremos el Slug
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms]; // Creamos un Array con Todo lo anterior
    const room = tempRooms.find((room) => room.slug === slug); // alojaremos el ROOM que contenga el mismo SLUG
    return room;
  };
  // Render:
  render() {
    return (
      <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom }}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

// CONSUMER:
const RoomConsumer = RoomContext.Consumer;
//
// HIGHER ORDER COMPONENT: Creamos una Function que envuelva directamente el COMPONENT que querramos
// Nos ahorramos el Value =>
// PERO HAY QUE CREAR TODO DE CERO
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

// Export
export { RoomProvider, RoomConsumer, RoomContext };
// Deberiamos poner el PROVIDER que envuelva todo, mas facil hacerlo en INDEX
