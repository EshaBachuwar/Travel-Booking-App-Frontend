import React from 'react';
import './featured.css';
import useFetch from '../../hooks/useFetch.js';

const Featured = () => {
  const { data, loading, error } = useFetch(
    '/hotels/countByCity?cities=adilabad,hyderabad,jabalpur'
  );

  return (
    <div
      className="d-flex justify-content-between gap-5 z-1"
      style={{ width: '100%', maxWidth: '1024px' }}
    >
      {loading ? (
        'Loading please wait'
      ) : (
        <>
          <div
            className="position-relative text-white rounded-4 overflow-hidden"
            style={{ height: '17rem' }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="object-fit-cover"
              style={{ width: '100%' }}
            />
            <div className="position-absolute featuredTitle bottom-sm-100 start-sm-100">
              <h1>Adilabad</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div
            className="position-relative text-white rounded-4 overflow-hidden"
            style={{ height: '17rem' }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/ci ty/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="object-fit-cover"
              style={{ width: '100%' }}
            />
            <div className="position-absolute featuredTitle bottom-sm-100 start-sm-100">
              <h1>Hyderabad</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div
            className="position-relative text-white rounded-4 overflow-hidden"
            style={{ height: '17rem' }}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="object-fit-cover"
              style={{ width: '100%' }}
            />
            <div className="position-absolute featuredTitle bottom-sm-100 start-sm-100">
              <h1>Jabalpur</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
