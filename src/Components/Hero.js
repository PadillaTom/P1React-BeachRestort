import React from 'react';

// Main: Pasamos como Parametro unas Props: CHILDREN y HERO
export default function Hero({ children, hero }) {
  // Decidimos pasar una PROPS como CLASS:
  return <header className={hero}>{children}</header>;
}
// Defaults:
// HERO: Aqui decidimos que para la PROPS tendremos una default:
// en caso de omitir: hero="classname"
Hero.defaultProps = {
  hero: 'defaultHero',
};
