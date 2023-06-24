import React from 'react';
import PropTypes from 'prop-types';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import './popular.scss';

const style = {
  icon: {
    height: 13,
    width: 13,
    marginLeft: 5,
    marginRight: 5,
  },
};

const getPopular = (arr, cb, currency) =>
  arr.map((item, key) => (
    <div
      className="popular__item row"
      key={key + Date.now()}
      onClick={cb}
      data-link={`/${item.cityFromNameEn}/${item.cityToNameEn}`}
    >
      <div className="col-md-9 col-xs-8">
        <span className="item__name">{item.cityFromName}</span>
        <ArrowForward style={style.icon} />
        <span className="item__name">{item.cityToName}</span>
      </div>
      <div className="col-md-3 col-xs-4">
        <span className="item__price-label">от</span>
        <span className="item__price">{item.minPrice}</span>
        <span className="item__currency">{currency}</span>
      </div>
    </div>
  ));

const PopularDestinations = ({
  currency,
  departure,
  arrived,
  handlerClick,
  departureName,
  arrivedName,
}) => {
  const departureList = getPopular(departure, handlerClick, currency);
  const arrivedList = getPopular(arrived, handlerClick, currency);

  if (departureList.length > arrivedList.length) {
    departureList.length = arrivedList.length;
  } else {
    arrivedList.length = departureList.length;
  }

  return departureList.length && arrivedList.length ? (
    <div className="popular show-desktop">
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <h2>Популярные направления</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <h3 className="text-center">Из города {departureName}</h3>
          {departureList}
        </div>
        <div className="col-md-6 col-xs-12">
          <h3 className="text-center">Из города {arrivedName}</h3>
          {arrivedList}
        </div>
      </div>
    </div>
  ) : null;
};

PopularDestinations.propTypes = {
  currency: PropTypes.string.isRequired,
  departure: PropTypes.arrayOf(PropTypes.object).isRequired,
  arrived: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlerClick: PropTypes.func.isRequired,
  departureName: PropTypes.string.isRequired,
  arrivedName: PropTypes.string.isRequired,
};

export default PopularDestinations;
