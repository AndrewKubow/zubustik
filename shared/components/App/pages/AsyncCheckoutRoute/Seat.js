import React from 'react';
import classNames from 'classnames';

import './seat.scss';

const Seat = ({ number, empty, secondSide, free, handlerClick, raceId, selected }) => {
  const siteStyle = classNames({
    'seat-disabled': !empty && !free,
    'seat-free': !empty && free,
    'second-side': secondSide,
    selected,
    empty,
  });

  return (
    <div
      data-seat={number}
      className={siteStyle}
      onClick={free ? e => handlerClick(e, raceId) : null}
    >
      {!empty ? number : '\u00A0'}
    </div>
  );
};

export default Seat;
