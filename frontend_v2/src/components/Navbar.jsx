import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/items" className="nav-link">Items</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
      <Link to="/delete" className="nav-link">Delete</Link>
    </nav>
  );
}

export default Navbar;
