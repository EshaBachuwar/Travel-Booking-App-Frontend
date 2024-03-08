import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <div className="border border-1 border-secondary-subtel d-flex p-4 rounded-4 justify-content-between gap-3 mb-2">
      <img
        src={item.photos[0]}
        alt=""
        className="object-fit-cover"
        style={{ width: '20rem', height: '15rem' }}
      />
      <div className="d-flex flex-column gap-1" style={{ flex: '2' }}>
        <h1 className="text-primary fs-3 d-flex flex-start">{item.name}</h1>
        <span className="fs-6 d-flex flex-start">
          {item.distance}m from center
        </span>
        <span
          className="fs-6 bg-success d-flex flex-start text-white px-2 py-1 rounded-2"
          style={{ width: 'max-content' }}
        >
          Free airport taxi
        </span>
        <span className="fs-6 d-flex flex-start fw-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="fs-6 d-flex flex-start">{item.desc}</span>
        <span className="fs-6 text-success fw-bold d-flex flex-start">
          Free cancellation{' '}
        </span>
        <span className="fs-6 text-success d-flex flex-start">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ flex: '1' }}
      >
        {item.rating && (
          <div className="d-flex justify-content-between align-items-start">
            <span className="fw-bold d-flex align-itens-center">Excellent</span>
            <button className="btn btn-primary text-white p-2 fw-bold m-0 border-0 rounded-0">
              {item.rating}
            </button>
          </div>
        )}
        <div className="d-flex gap-1 flex-column">
          <span className="d-flex justify-content-end fs-4">
            ${item.cheapestPrice}
          </span>
          <span
            className="d-flex justify-content-end text-end text-secondary"
            style={{ fontSize: '15px' }}
          >
            Includes taxes and fees
          </span>
          <div className="d-flex justify-content-end">
            <Link to={`/hotels/${item._id}`}>
              <button className="btn btn-primary text-white fw-bold py-2 px-1 border-0">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
