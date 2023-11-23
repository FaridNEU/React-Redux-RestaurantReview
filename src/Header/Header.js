import React from 'react';
import './Header.css';
import Navbar from '../Navbar/Navbar';

function Header() {
  return (
    <div className="Header">
      <Navbar loginFlag='Login' />
      <h3>Restaurants Review</h3>
    </div>
  );
}

export default Header;