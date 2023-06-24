import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import Trip from './Trip';

const style = {
  marginBottom: 20,
  backgroundColor: '#fbfbfb',
  paddingLeft: 20,
  paddingRight: 20,
};

const getNoTrips = () => (
    <div className="row" key={new Date()}>
      <div className="col-md-12">
        <p className="trip__notfound">Акционные направления в данный момент недоступны.</p>
      </div>
    </div>
  );

const Trips = ({trips, currency, handlerClick}) => {
  return (<div className="saletrips row">
    {trips.map((trip) => {
      return trip && trip.error ? (
        getNoTrips()
      ) : (
        <Trip
          trip={trip}
          currency={currency}
          key={trip.tripId}
          handlerClick={handlerClick}
        />
      );
    })}
  </div>);
};

Trips.PropTypes = {};

export default Trips;
