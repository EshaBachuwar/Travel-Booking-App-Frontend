import React, { useContext } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className=" bg-primary d-flex justify-content-center m-0 p-0"
      style={{ height: '6rem', width: '100%' }}
    >
      <div
        className="container text-white m-0 d-flex align-items-center justify-content-between"
        style={{ width: '100%' }}
      >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className="navbar-brand mb-0 h1 fw-bolder fs-3">Book Ease</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div>
            <button
              className="btn btn-white my-2 my-sm-0 mx-1 msx-sm-0 border-white text-black  hover-text-black bg-white"
              type="submit"
            >
              Register
            </button>
            <button
              className="btn btn-white my-2 my-sm-0 mx-1 mx-sm-0 border-white text-black  hover-text-black bg-white"
              type="submit"
            >
              login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
