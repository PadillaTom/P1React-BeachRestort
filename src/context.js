// :::::::::::: CONTEXT API :::::::::::::::::::

import React, { Component } from 'react';
import items from './data';
import Client from '../src/Contentful';

// Contentful API:
Client.getEntries({
  content_type: 'beachResort',
}).then((response) => console.log(response.items));
// Get Data ---->
// getData = async () => {
//   try {
//     let response = await Client.getEntries({
//       content_type: 'beachResort',
//     });
//     let rooms = this.formatData(response.items);
//     // console.log(rooms); // Una vez escrita toda la funcion: Vemos el Array
//     let featuredRooms = rooms.filter((room) => room.featured === true);
//     // console.log(featuredRooms); // Comprobamos
//     // Establecemos los MAX:
//     let maxPrice = Math.max(...rooms.map((item) => item.price));
//     let maxSize = Math.max(...rooms.map((item) => item.size));
//     this.setState({
//       rooms,
//       featuredRooms,
//       sortedRooms: rooms,
//       loading: false,
//       price: maxPrice,
//       maxPrice,
//       maxSize,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

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
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };
  //
  // Get Data:

  // Once we have data:
  componentDidMount() {
    let rooms = this.formatData(items);
    // console.log(rooms); // Una vez escrita toda la funcion: Vemos el Array
    let featuredRooms = rooms.filter((room) => room.featured === true);
    // console.log(featuredRooms); // Comprobamos
    // Establecemos los MAX:
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });

    // SI USAMOS CONTENTFUL:
    // this.formatData();
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
  // Handle CHange for Filters:
  handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRoomrs
    );

    // console.log(type, name, value); // Logramos ver la info de cada Elemento
    // Que hacer:
  };
  // Filter Rooms :
  filterRoomrs = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state; // Primero Destructure el State
    //
    // All Rooms --->
    let tempRooms = [...rooms]; // Array temporal donde meteremos los ROOMS y la usaremos para filtrar
    //
    // Transform Values --->
    capacity = parseInt(capacity);
    price = parseInt(price);
    //
    // Filtered by Type --->
    if (type !== 'all') {
      // si NO ALL, devolveme un filtro de la TempRooms --> sean los type matched al selected
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    //
    // Filtered by Capacity --->
    if (capacity !== 1) {
      // Si no es 1: Devuelve la capacity Seleccionada y las mayores
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // Filter by Price ---->
    //          Mostrar las Rooms menores al PRICE dado en la barra
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //
    // Filter by Room Size ---->
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    // Filter by Breakfast ---->
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    // Filter by Pets ---->
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }
    //
    this.setState({
      sortedRooms: tempRooms, // Cambiamos el STATE por la TEMP ROOMS (solo el typed Matched)
    });
  };
  // Render:
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
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
