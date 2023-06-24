import React from 'react';

import Seat from './Seat';
import './bus.scss';

const placeInRow = 4;

const getRows = (busCapacity, freeSeats, choisePlace, raceId, selected) => {
  const rows = [];
  let cSeat = 1;

  while (busCapacity >= cSeat) {
    const row = [];

    for (let i = 0; i < placeInRow; i++) {
      const secondSide = i === 2;

      row.push(
        <Seat
          free={freeSeats.includes(cSeat)}
          number={cSeat}
          secondSide={secondSide}
          key={cSeat}
          empty={!(busCapacity >= cSeat)}
          handlerClick={choisePlace}
          raceId={raceId}
          selected={selected.includes(cSeat)}
        />,
      );

      cSeat++;
    }
    rows.push(
      <div className="bus__row" key={`${cSeat}-row`}>
        {row}
      </div>,
    );
  }

  return rows.reverse();
};

const Bus = ({ busCapacity, places, choisePlace, raceId, selected = [] }) => {
  const freeSeats = places.map(item => item.num);
  const rows = getRows(busCapacity, freeSeats, choisePlace, raceId, selected);

  return (
    <div className="bus-wrapper">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 text-center col-xs-12">
          <div className="bus">
            {rows}
            <div className="bus__row">
              <p className="bus__wheel" />
              <p className="bus__exit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bus;
