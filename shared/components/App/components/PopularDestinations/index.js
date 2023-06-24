import React from 'react';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import ScrollEffect from '../../_common/Animate';
import './popular.scss';

const style = {
  icon: {
    height: 13,
    width: 13,
    marginLeft: 5,
    marginRight: 5,
  },
  arrow: {
    height: 11,
    width: 16,
    color: '#999999',
  },
  inern: {
    height: 20,
    width: 20,
    color: '#ffffff',
    marginLeft: 13,
    marginRight: 13,
  },
};

const getInternal = (arr, cb, currency) => {
  const full = arr.map(item => (
    <div
      className="popular__internal row"
      key={Math.random()}
      onClick={cb}
      data-link={`/${item.cityFromNameEn}/${item.cityToNameEn}`}
    >
      <div className="col-md-9 col-xs-8 popular__direction">
        <h4>
          <span>{item.cityFromName}</span>
          <ArrowForward style={style.icon} />
          <span>{item.cityToName}</span>
        </h4>
      </div>
      <div className="col-md-3 col-xs-4 popular__price">
        <p>
          от<span className="price">{item.minPrice}</span>{' '}
          <span className="currency">{currency}</span>
        </p>
      </div>
    </div>
  ));
  const half = Math.floor(full.length / 2);

  return {
    colLeft: full.slice(0, half),
    colRight: full.slice(half, 2 * half),
  };
};

const PopularDestinations = (props) => {
  const currency = props.currency;
  const internal = props.data.length
    ? getInternal(props.data, props.handlerClick, currency)
    : {
      colLeft: null,
      colRight: null,
    };

  return (
    <div className="popular">
      <h2>Популярные направления</h2>
      <div className="row">
        <ScrollEffect animate="fadeInLeft">
          <div className="col-md-6 col-xs-12 popularleft">
            <div className="row">
              <div className="col-md-10 col-md-offset-1 popular__wrapper">{internal.colLeft}</div>
            </div>
          </div>
        </ScrollEffect>
        <ScrollEffect animate="fadeInRight">
          <div className="col-md-6 col-xs-12 popularright">
            <div className="row">
              <div className="col-md-10 col-md-offset-1 popular__wrapper">{internal.colRight}</div>
            </div>
          </div>
        </ScrollEffect>
      </div>
    </div>
  );
};

export default PopularDestinations;
