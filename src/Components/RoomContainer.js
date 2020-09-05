// Prueba de Higher Order Component:
import React from 'react';
import RoomsFilter from './RoomFilter';
import RoomList from './RoomList';
import { withRoomConsumer } from '../context'; // Daremos Acceso al CONTEXT!! Se usa una (value) =>{} dentro de CONSUMER
import Loading from './Loading';
// Creamos la Function CONTAINER y pasaremos el CONTEXT, de esta manera ya esta todo envuelto
// En vez de tener que envolver todo y usar Value =>
// PERO ESTA TODO PREVIAMENTE CREADA LA FUNCTION HIGHER ORDER EN CONTEXT!
function RoomContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <RoomsFilter rooms={rooms}></RoomsFilter>
      <RoomList rooms={sortedRooms}></RoomList>
    </div>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from 'react';
// import RoomsFilter from './RoomFilter';
// import RoomList from './RoomList';
// import { RoomConsumer } from '../context'; // Daremos Acceso al CONTEXT!! Se usa una (value) =>{} dentro de CONSUMER
// import Loading from './Loading';

// // Main:
// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         // console.log(value); // Vemos todo el acceso al State
//         const { loading, sortedRooms, rooms } = value;
//         if (loading) {
//           return <Loading></Loading>;
//         }
//         return (
//           <div>
//             Hello from ROOMS CONTAINER
//             <RoomsFilter rooms={rooms}></RoomsFilter>
//             <RoomList rooms={sortedRooms}></RoomList>
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
