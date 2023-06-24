import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Price = ({
  priceClass,
  isBack,
  price,
  discPrice,
  fullPrice,
  isChange,
  currency,
  bestOffers,
  minPrice,
  maxPercent,
}) => {
  const allPrice = isBack ? (
    <p className="trip__full-price text-right">
      Всего: <span>{fullPrice}</span> <span className="currency">{currency}</span>
    </p>
  ) : null;
  const lonelyPrice = isChange && discPrice ? discPrice : price;
  const priceStyle =
    (minPrice && maxPercent) || discPrice || isBack ? 'desktop-text-right' : 'desktop-text-center';

  if (bestOffers) {
    // const bestPrice = minPrice || discPrice ||price;
    const bestPrice = price;

    return (
      <div className={priceClass}>
        <p className={`trip__price-lonely trip__price-bestoffers ${priceStyle}`}>
          {bestPrice} <span className="currency">{currency}</span>
        </p>
        {allPrice}
      </div>
    );
  }

  if (discPrice && !isChange) {
    return (
      <div className={priceClass}>
        <p className={`trip__old-price ${priceStyle}`}>
          {price} <span className="currency">{currency}</span>
        </p>
        <p className={`trip__price ${priceStyle}`}>
          {discPrice} <span className="currency">{currency}</span>
        </p>
        {allPrice}
      </div>
    );
  }

  return (
    <div className={priceClass}>
      <p className={`trip__price-lonely ${priceStyle}`}>
        {lonelyPrice} <span className="currency">{currency}</span>
      </p>
      {allPrice}
    </div>
  );
};

export default Price;
