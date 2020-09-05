import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../Components/Title';
import { getQueriesForElement } from '@testing-library/react';

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
  //
  // Mappeamos para obtener un JSX --> Option para cada TYPE
  types = types.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });
  // Map into JSX ---> Option Para People ::::
  // EL VALUE DE OPTION ES STR, PASAMOS A NUMBER (EN CONTEXT)
  let people = getUnique(rooms, 'capacity');
  people = people.map((item, index) => {
    return (
      <option key={index} value={item}>
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
        {/* Guest*/}
        <div className='form-group'>
          <label htmlFor='capacity'>Guests</label>
          <select
            name='capacity'
            id='capacity'
            value={capacity}
            className='form-control'
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* End Guest*/}
        {/* Price */}
        <div className='form-group'>
          <label htmlFor='price'>Room Price ${price}</label>
          <input
            type='range'
            name='price'
            min={minPrice}
            max={maxPrice}
            id='price'
            value={price}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        {/* End Price */}
        {/* Size */}
        <div className='form-group'>
          <label htmlFor='size'>Room Size</label>
          <div className='size-inputs'>
            <input
              type='number'
              name='minSize'
              id='size'
              value={minSize}
              onChange={handleChange}
              className='size-input'
            />
            <input
              type='number'
              name='maxSize'
              id='size'
              value={maxSize}
              onChange={handleChange}
              className='size-input'
            />
          </div>
        </div>
        {/* End of Size */}
        {/* Extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>Breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor='breakfast'>Pets</label>
          </div>
        </div>
        {/* End Extras */}
      </form>
    </section>
  );
}
