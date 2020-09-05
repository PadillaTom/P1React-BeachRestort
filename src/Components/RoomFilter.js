import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../Components/Title';

// Function para obtener los TYPES de las ROOMS, SIN REPETIR --> Luego sera pasada
// dentro del Filter TYPE (single, double, presidential, etc)
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
  // SET SOLO ACEPTA VALORES NO REPETIDOS (UNICOS)
  // cualquier parametro que le pasemos  NO LO REPETIRA ----> VER ABAJO
};

// Main:
export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);
  //   console.log(context);
  // VEMOS QUE EVITAMOS TODO LAS HIGHER ORDER COMPONENT, TODO EL RESTO. USANDO HOOKS
  // DIRECTAMENTE ASOCIAMOS EL --> USECONTEXT(LO QUE QUERRAMOS) -->
  // A UNA VARIABLE Y LISTO!!!!!!!!!!!!!!!!!!!!!!
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;
  // Y ASI DE SIMPLE TENEMOS EL ACCESO A TODO DENTRO DEL STATE.
  //
  //--->  Probamos los Unique Values:
  let types = getUnique(rooms, 'type');
  //   console.log(types);

  // Add ALL a types, asi tenemos los types de rooms + All para filtrar:
  types = ['all', ...types]; // All + REST OF TYPES
  // Mappeamos para obtener un JSX --> Creamos Option para cada TYPE
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  //
  // Return
  return (
    <section className='filter-container'>
      <Title title='search Rooms'></Title>
      <form className='filter-form'>
        {/* Select Type */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select
            name='type'
            id='type'
            value={type}
            className='form-control'
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* End Select Type */}
      </form>
    </section>
  );
}
