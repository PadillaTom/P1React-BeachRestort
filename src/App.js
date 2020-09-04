import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Rooms from './Pages/Rooms';
import SingleRoom from './Pages/SingleRoom';
import Error from './Pages/Error';
//
// ---> React Router DOM:
import { Route, Switch } from 'react-router-dom';

// usaremos el fragment: Route Path="/xxx" component ={}
// Para las Home agregaremos el props: EXACT --> Only the selected will be rendered
// SLUG --> Es como una variable que podremos acceder desde cada single room. Cada una con su correspondiente INFO
//
// ---> Components:
import Navbar from './Components/Navbar';

//
// Main Function:
function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/rooms' component={Rooms}></Route>
        <Route exact path='/rooms/:slug' component={SingleRoom}></Route>
        <Route component={Error}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
