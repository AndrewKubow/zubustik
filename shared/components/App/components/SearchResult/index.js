import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import Title from './Title';
import Trips from './Trips';
import NoTrips from './NoTrips';

import './searchResult.scss';

function SearchResult(props) {
  const {
    sorted,
    handlerSort,
    filter,
    arrived,
    departure,
    changeTime,
    isBack,
    animation,
    trips,
    click,
    cDetails,
    details,
    isLoading,
    direction,
    isLoadingTrips,
    isLoadingNoTrips,
    nextRoute,
    changeDay,
    regularHelp,
    currency,
    freePlaces,
  } = props;

  return (
    <div className="results">
      {trips.length && freePlaces ? (
        <Title
          sorted={sorted}
          handlerSort={handlerSort}
          filter={filter}
          arrived={arrived}
          departure={departure}
          changeTime={changeTime}
          isBack={isBack}
        />
      ) : null}
      {!trips.length && isLoadingTrips ? (
        <div className="trip__progress">
          <CircularProgress size={80} thickness={5} />
        </div>
      ) : (
        <div className={animation}>
          {trips.length && freePlaces ? (
            <Trips
              trips={trips}
              handlerClick={click}
              cDetails={cDetails}
              details={details}
              isLoading={isLoading}
              direction={direction}
              currency={currency}
            />
          ) : (
            <NoTrips
              arrived={arrived}
              departure={departure}
              date={nextRoute}
              changeDay={changeDay}
              regularHelp={regularHelp}
              isLoading={isLoadingNoTrips}
              freePlaces={freePlaces}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
