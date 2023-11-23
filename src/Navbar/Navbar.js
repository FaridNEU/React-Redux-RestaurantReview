import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUser } from '../FetchData/FetchData';


function Navbar({ loginFlag }) {

  const loggedInUser = useSelector((state) => state.loggedInUser.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, [dispatch]);

  return (
    <div className="Navbar">
      <li>
        <Link to={'/'}>
          <button>Home</button>
        </Link>
      </li>
      {loggedInUser === null || loggedInUser === '' ? (
      <li>
        <Link to={'/login'}>
        <button>{loginFlag}</button>
        </Link>
      </li>
      ):(
        <li>
          <Link to={'/dashboard'}>
          <button>{loggedInUser}</button>
          </Link>
        </li>
      )}
    </div>
  );
}

export default Navbar;