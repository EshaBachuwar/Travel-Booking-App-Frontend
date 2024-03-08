import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
  const [showDate, setShowDate] = useState(false);
  const [destination, setDestination] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const { user } = useContext(AuthContext);
  const handleClick = () => {
    setShowDate(!showDate);
  };
  const handleOption = (option, operator) => {
    setOptions((prev) => {
      return {
        ...options,
        [option]: operator === 'i' ? options[option] + 1 : options[option] - 1,
      };
    });
  };
  const handleOptions = () => {
    setOpenOptions(!openOptions);
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
    navigate('/hotels', { state: { dates, options, destination } });
  };

  return (
    <div className="bg-primary text-white d-flex justify-content-center position-relative">
      <div
        className="conatiner mt-2 mb-5"
        style={{ width: '100%', maxWidth: '1024px' }}
      >
        <div className="container d-flex ">
          <div
            className="container d-flex align-items-center gap-2 headerList mt-1 mb-1 cursor-pointer"
            style={{ width: '8rem' }}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div
            className="container d-flex align-items-center gap-2 headerList mt-1 mb-1 cursor-pointer"
            style={{ width: '8rem' }}
          >
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div
            className="container d-flex align-items-center gap-2 headerList mt-1 mb-1 cursor-pointer"
            style={{ width: '8rem' }}
          >
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div
            className="container d-flex align-items-center gap-2 headerList mt-1 mb-1 cursor-pointer"
            style={{ width: '8rem' }}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div
            className="container d-flex align-items-center gap-2 headerList mt-1 mb-1 cursor-pointer"
            style={{ width: '10rem' }}
          >
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type === 'list' ? (
          ''
        ) : (
          <>
            <h1 className="mt-3">A lifetime of discounts? It's Genius.</h1>
            <p>
              {' '}
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free booking account
            </p>
            {!user && (
              <div className="d-flex justify-content-center mb-5 mb-lg-0">
                <button
                  className="btn btn-white my-2 mx-1 mb-5 msx-sm-0 border-white text-black bg-white "
                  style={{ width: '9rem', height: '4rem' }}
                >
                  Sign in/Login
                </button>
              </div>
            )}
            <div
              className="container bg-light d-flex align-items-center justify-content-around border border-warning border-4 rounded p-2 position-absolute headerSearch "
              style={{ maxHeight: '20rem' }}
            >
              <div className="d-flex justify-content-around align-items-center ">
                <FontAwesomeIcon icon={faBed} className="text-dark mx-2" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-0 "
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div
                className="d-flex justify-content-around align-items-center text-body-tertiary cursor-pointer z-2"
                onClick={handleClick}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-body-secondary mx-2"
                />
                <span>{`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yyyy'
                )}`}</span>
                {showDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="position-absolute top-100 dateRange"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="d-flex justify-content-around align-items-center text-body-tertiary z-2">
                <FontAwesomeIcon icon={faPerson} className="text-dark mx-2" />
                <span
                  className="cursor-pointer"
                  onClick={handleOptions}
                >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>
                {openOptions && (
                  <div className="position-absolute options bg-white text-dark border border-2 shadow-lg rounded-4 p-3">
                    <div
                      className="d-flex justify-content-between my-2"
                      style={{ width: '9rem' }}
                    >
                      <span>Adult</span>
                      <div
                        className="d-flex justify-content-between"
                        style={{ width: '50%' }}
                      >
                        <button
                          disabled={options.adult <= 1}
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('adult', 'd')}
                        >
                          -
                        </button>
                        <span>{options.adult}</span>
                        <button
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('adult', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between my-2"
                      style={{ width: '9rem' }}
                    >
                      <span>Children</span>
                      <div
                        className="d-flex justify-content-between"
                        style={{ width: '50%' }}
                      >
                        <button
                          disabled={options.children <= 0}
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('children', 'd')}
                        >
                          -
                        </button>
                        <span>{options.children}</span>
                        <button
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('children', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-between my-2"
                      style={{ width: '9rem' }}
                    >
                      <span>Room</span>
                      <div
                        className="d-flex justify-content-between"
                        style={{ width: '50%' }}
                      >
                        <button
                          disabled={options.room <= 1}
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('room', 'd')}
                        >
                          -
                        </button>
                        <span>{options.room}</span>
                        <button
                          className="border-1 border-primary bg-white"
                          onClick={() => handleOption('room', 'i')}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-around align-items-center ">
                <button
                  className="btn btn-white my-2 my-sm-0 text-white bg-primary "
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
