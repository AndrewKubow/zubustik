import React from 'react';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';

import Price from './Price';

import './trip.scss';

const getDiscount = (discount, bestOffers) => {
  const prefix = bestOffers ? 'до' : '~';

  return (
    <div className="col-md-1">
      <Paper
        zDepth={1}
        circle
        className="trip__discount"
        style={bestOffers ? { marginTop: 5 } : {}}
      >
        <span>{`${prefix} ${discount}%`}</span>
      </Paper>
    </div>
  );
};

const Trip = ({ trip, arrow, isBack, label, currency, bestOffers }) => {
  const isChange = String(trip.id).split('-').length > 1 && !trip.backTripId;
  const arrowClassd = arrow ? 'trip__arrow-one showdesktopib' : 'trip__arrow-multi showdesktopib';
  const arrowClassm = arrow ? 'trip__arrow-one showmobileb' : 'trip__arrow-multi showmobileb';
  const placesClass = trip.places > 5 ? 'trip__places' : 'trip__places trip__places__low';
  const priceClass = trip.discPerc || isBack ? 'priceClass-2' : 'priceClass-3';
  const durationClass = bestOffers ? 'col-md-3 col-xs-12' : 'col-md-2 col-xs-12';
  // const priceBestClass = bestOffers ? 'col-md-2 col-md-offset-1 col-xs-12' : 'col-md-2 col-xs-12';
  const priceBestClass = bestOffers ? 'col-md-2 col-xs-12' : 'col-md-2 col-xs-12';
  const cntPlaceClass = bestOffers ? 'col-md-1 col-xs-12' : 'col-md-2 col-xs-12';

  const discount = trip.discPerc && !isChange ? getDiscount(trip.discPerc, bestOffers) : null;

  const timeDep = trip.timeDep || trip.dtDepFormated;
  const timeArr = trip.timeArr || trip.dtArrFormated;

  return (
    <div className="results__trip">
      <div className="row">
        <div className="col-md-3 col-xs-12">
          <div className="col-md-12 col-xs-4">
            <div className="trip__time trip__time__departure">
              <span className="trip-departure-datetime show-desktop">{trip.dtDepFormated}</span>
              <span className="trip-departure-time show-mobile">{timeDep}</span>
              <span className="trip-departure-date show-mobile">{trip.dateDep}</span>
            </div>
          </div>
          <div className="col-md-12 col-xs-8">
            <p className="trip__station trip__station__departure">
              {trip.stDepName},<br />
              {trip.stDepAddr}
            </p>
          </div>
        </div>
        <div className={durationClass}>
          <div className="col-md-12 col-xs-4 trip-arrow-div">
            <p className={arrowClassm} />
            <p className="trip__duration showdesktopb">{`${trip.wayTimeH}ч ${trip.wayTimeM}мин`}</p>
          </div>
          <div className="col-md-12 col-xs-8 trip-duration-div ">
            <p className={arrowClassd} />
            <p className="trip__change showdesktopb">{label}</p>
            <p className="trip__duration showmobileib">{`${trip.wayTimeH}ч ${trip.wayTimeM}мин`}</p>
            <p className="trip__change showmobileib">{label}</p>
          </div>
        </div>
        <div className="col-md-3 col-xs-12">
          <div className="col-md-12 col-xs-4">
            <div className="trip__time trip__time__arrived">
              <span className="trip-arrived-datetime show-desktop">{trip.dtArrFormated}</span>
              <span className="trip-arrived-time show-mobile">{timeArr}</span>
              <span className="trip-arrived-date show-mobile">{trip.dateArr}</span>
            </div>
          </div>
          <div className="col-md-12 col-xs-8">
            <p className="trip__station  trip__station__arrived">
              {trip.stArrName},<br />
              {trip.stArrAddr}
            </p>
          </div>
        </div>
        <div className={cntPlaceClass}>
          <div className="col-md-12 col-xs-4" />
          <div className="col-md-12 col-xs-8">
            {trip.places && (
              <div>
                <p className="sitlabel">свободных мест: </p>
                <p className={placesClass}>{trip.places}</p>
              </div>
            )}
          </div>
        </div>
        <div className={priceBestClass}>
          <div className="col-md-6 col-xs-4 col-price">
            <Price
              priceClass={priceClass}
              isBack={isBack}
              isChange={isChange}
              price={trip.price}
              discPrice={trip.discPrice}
              fullPrice={trip.fullPrice}
              currency={currency}
              bestOffers={bestOffers}
              minPrice={trip.minPrice}
              maxPercent={trip.maxPercent}
            />
          </div>
          <div className="col-md-6 col-xs-8 col-discount">{discount}</div>
        </div>
      </div>
    </div>
  );
};

Trip.defaultProps = {
  isBack: false,
  bestOffers: false,
};

Trip.propTypes = {
  currency: PropTypes.string.isRequired,
  trip: PropTypes.objectOf(PropTypes.any).isRequired,
  arrow: PropTypes.bool.isRequired,
  isBack: PropTypes.bool,
  label: PropTypes.string.isRequired,
  bestOffers: PropTypes.bool,
};

export default Trip;
