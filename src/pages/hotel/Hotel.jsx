import React, { useContext, useLayoutEffect } from 'react';
import Navbar from '../../components/navabar/Navbar';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext, AuthContextProvider } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);

  const { dates, options } = useContext(SearchContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        ' loading'
      ) : (
        <div className="d-flex align-items-center flex-column mt-3">
          {open && (
            <div
              className="position-absolute start-0 bottom-0 end-0 z-3 d-flex align-items-center justify-content-center"
              style={{
                top: '15rem',
                width: '98vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.251)',
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="position-absolute fs-3 text-secondary cursor-pointer"
                style={{ top: '2rem', right: '2rem' }}
                onClick={() => setOpen(false)}
              />
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="d-flex fs-4 text-secondary cursor-pointer "
                  onClick={() => handleMove('l')}
                />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className=""
                  style={{ width: '80%', height: '80vh' }}
                />
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="d-flex fs-4 text-secondary cursor-pointer "
                  onClick={() => handleMove('r')}
                />
              </div>
            </div>
          )}
          <div
            className="d-flex flex-column gap-1 position-relative"
            style={{ width: '100%', maxWidth: '1224px' }}
          >
            <button
              className="position-absolute btn btn-primary"
              style={{ top: '1rem', right: '0' }}
              onClick={handleClick}
            >
              Reserve or Book Now!
            </button>
            <h1 className="d-flex justify-content-start fs-3">{data.name}</h1>
            <div className="d-flex justify-content-start align-items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="d-flex justify-content-start text-primary fw-semibold">
              Excellent location - {data.distance}m from center
            </span>
            <span className="d-flex justify-content-start text-success fw-semibold">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="d-flex flex-wrap justify-content-between gap-1">
              {data.photos?.map((photo, index) => (
                <div className="" style={{ width: '33%' }}>
                  <img
                    src={photo}
                    alt=""
                    className="object-fit-cover cursor-pointer"
                    onClick={() => handleOpen(index)}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4 ">
              <div style={{ flex: '3' }}>
                <h1 className="d-flex justify-content-start fs-3 fw-bold">
                  {data.title}
                </h1>
                <p className="fs-6 mt-4 text-start">{data.desc}</p>
              </div>
              <div
                className="p-2 d-flex flex-column gap-2"
                style={{ flex: '1', backgroundColor: '#ebf3ff' }}
              >
                <h1 className="fs-4 text-secondary text-start">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="fs-6 text-start">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="fw-light">
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{' '}
                  nights)
                </h2>
                <button className="btn btn-primary" onClick={handleClick}>
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MailList />
      <div className=" d-flex justify-content-center mt-2">
        <Footer />
      </div>
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
