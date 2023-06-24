import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Collapse } from 'react-collapse';

import Trip from './Trip';
import Footer from './Footer';
import Details from './Details';

const style = {
  marginBottom: 20,
  backgroundColor: '#fbfbfb',
  paddingLeft: 20,
  paddingRight: 20,
};

const getArrow = (id, back) => {
  const cnt = String(id).split('-').length;

  return !back ? cnt === 1 : cnt === 2;
};

const getLabel = (arrow, isBack, direction) => {
  if (!isBack && !arrow) return '1 пересадка';
  if (!isBack && arrow) return 'прямой рейс';
  if (isBack && arrow && direction === 'forward') return 'туда';
  if (isBack && arrow && direction === 'backward') return 'обратно';

  return true;
};

const getNoTrips = () => (
  <div className="row" key={new Date()}>
    <div className="col-md-12">
      <p className="trip__notfound">По данным параметрам рейсов не найдено.</p>
    </div>
  </div>
);

const Trips = ({
  trips,
  handlerClick,
  cDetails,
  details,
  isLoading,
  direction,
  bestOffers,
  currency,
  handlerPurchase,
}) => (
  <div>
    {trips.map((trip) => {
      if (trip.places === 0) return null;
      const isBack = !!trip.backTripId;
      const arrow = getArrow(trip.id, trip.backTripId);
      const fTripLabel = getLabel(arrow, isBack, 'forward');
      const bTripLabel = getLabel(arrow, isBack, 'backward');

      return trip && trip.error ? (
        getNoTrips()
      ) : (
        <div key={trip.tripId} className="trip-container">
          <Trip
            trip={trip}
            arrow={arrow}
            label={fTripLabel}
            currency={currency}
            bestOffers={bestOffers}
          />
          <Footer
            cDetails={cDetails}
            cb={handlerClick}
            handlerPurchase={handlerPurchase}
            carrier={trip.carrier}
            tripId={trip.tripId}
            isBack={isBack}
            direction="forward"
            bestOffers={bestOffers}
            depDates={trip.depDates}
            rawTripId={trip.rawTripId}
            places={trip.places}
          />
          <Collapse isOpened={trip.tripId === cDetails && direction === 'forward'}>
            {!isLoading ? (
              <Details
                fullPrice={trip.fullPrice}
                details={details[trip.tripId] ? details[trip.tripId].forward : null}
                bestOffers={bestOffers}
              />
            ) : (
              <div>&nbsp;</div>
            )}
          </Collapse>
          {isBack ? <hr /> : null}
          {isBack ? (
            <Trip
              trip={{
                dtDepFormated: trip.backDtDepFormated,
                stDepName: trip.backStDepName,
                stDepAddr: trip.backStDepAddr,
                wayTimeH: trip.backWayTimeH,
                wayTimeM: trip.backWayTimeM,
                dtArrFormated: trip.backDtArrFormated,
                stArrName: trip.backStArrName,
                stArrAddr: trip.backStArrAddr,
                places: trip.backPlaces,
                price: trip.backPrice,
                discPrice: trip.backDiscPrice,
                fullPrice: trip.fullPrice,
                discPerc: trip.backDiscPerc,
              }}
              arrow={arrow}
              label={bTripLabel}
              currency={currency}
              isBack
            />
          ) : null}
          {trip.backTripId ? (
            <div>
              <Footer
                cDetails={cDetails}
                cb={handlerClick}
                carrier={trip.backCarrier}
                tripId={trip.backTripId}
                direction="backward"
                places={trip.places}
              />
              <Collapse isOpened={trip.backTripId === cDetails && direction === 'backward'}>
                {!isLoading ? (
                  <Details
                    fullPrice={trip.fullPrice}
                    details={details[trip.tripId] ? details[trip.tripId].backward : null}
                    tripId={trip.tripId}
                    backward
                  />
                ) : (
                  <div>&nbsp;</div>
                )}
              </Collapse>
            </div>
          ) : null}
        </div>
      );
    })}
  </div>
);

Trips.PropTypes = {};

export default Trips;
