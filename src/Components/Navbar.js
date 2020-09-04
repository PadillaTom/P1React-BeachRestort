import React, { Component } from 'react';
// Components:
import logo from '../images/logo.svg';
import { FaAlignRight } from 'react-icons/fa';
// Router:
import { Link } from 'react-router-dom';

// Main:
export default class Navbar extends Component {
  // State:
  state = {
    isOpen: false,
  };
  // Methods:
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen }); // Toggle False, True
  };
  // Render:
  render() {
    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <img src={logo} alt='Resort' />
            </Link>
            <button type='button' className='nav-btn'>
              <FaAlignRight
                className='nav-icon'
                onClick={this.handleToggle}
              ></FaAlignRight>
            </button>
          </div>
          <ul
            className={this.state.isOpen ? 'nav-links show-nav' : 'nav-links'}
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/rooms'>Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
