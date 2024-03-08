import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/navabar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch.js';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="d-flex justify-content-center mt-4">
        <div
          className="d-flex gap-2"
          style={{ width: '100%', maxWidth: '1224px' }}
        >
          <div
            className="rounded-3 position-sticky px-3 pt-2"
            style={{
              flex: '1',
              backgroundColor: '#febb02',
              top: '10px',
              height: 'max-content',
            }}
          >
            <h1 className="fs-3 text-secondary-emphasis mb-2">Search</h1>
            <div className="d-flex flex-column gap-1 mb-2">
              <label htmlFor="" className="fs-6 d-flex flex-start fw-semibold">
                Destination
              </label>
              <input
                type="text"
                placeholder={destination}
                className=" rounded-2 border-0"
                style={{ height: '3rem' }}
              />
            </div>
            <div className="d-flex flex-column gap-1 mb-2">
              <label htmlFor="" className="fs-6 d-flex flex-start fw-semibold">
                Chech-in Date
              </label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="d-flex flex-start  bg-white p-2 align-item-center cursor-pointer rounded-2"
                style={{}}
              >{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
                dates[0].endDate,
                'MM/dd/yyyy'
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  className="rounded-2"
                />
              )}
            </div>
            <div className="d-flex flex-column gap-1 mb-2">
              <label htmlFor="" className="fs-6 d-flex flex-start fw-semibold">
                Options
              </label>
              <div className="p-2">
                <div className="d-flex justify-content-between mb-2 text-secondary-emphasis fs-6">
                  <span>
                    Min Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    style={{ width: '4rem' }}
                  />
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary-emphasis fs-6">
                  <span>
                    Max Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    style={{ width: '4rem' }}
                  />
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary-emphasis fs-6">
                  <span>Adult</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={options.adult}
                    style={{ width: '4rem' }}
                  />
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary-emphasis fs-6">
                  <span>Children</span>
                  <input
                    type="number"
                    min={0}
                    placeholder={options.children}
                    style={{ width: '4rem' }}
                  />
                </div>
                <div className="d-flex justify-content-between mb-2 text-secondary-emphasis fs-6">
                  <span>Room</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={options.room}
                    style={{ width: '4rem' }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="p-2 text-white btn border-0 rounded-2 mt-0 fw-semibold"
                style={{ backgroundColor: '#0071c2', width: '100%' }}
                onClick={handleClick}
              >
                Search
              </button>
            </div>
          </div>
          <div style={{ flex: '3' }}>
            {loading ? (
              'loading'
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
            {/* <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
