import React from 'react';
import './featuredProperties.css';
import useFetch from '../../hooks/useFetch.js';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('/hotels?featured=true');
  return (
    <div
      className="d-flex justify-content-between gap-2 mb-3"
      style={{ width: '100%', maxWidth: '1024px' }}
    >
      {loading ? (
        'loading'
      ) : (
        <>
          {data.map((item) => (
            <div className="d-flex flex-column gap-2 flex-1" key={item._id}>
              <img src={item.photos[0]} alt="" style={{ width: '100%' }} />
              <span className="fw-bold">{item.name}</span>
              <span className="fw-semibold">{item.city}</span>
              <span className="fw-semibold">
                Starting from ${item.cheapestPrice}
              </span>
              <div className="d-flex align-items-center justify-content-center gap-2">
                {item.ratimg && (
                  <>
                    <button className="btn btn-primary text-white m-0 fw-bold rounded-0 border-0">
                      {item.rating}
                    </button>
                    <span className="fs-6">Excellent</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
