import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TimeFilter from '../../_common/TimeFilter';
import Arrow from '../../_common/Arrow';

const Title = ({ sorted, handlerSort, filter, arrived, departure, changeTime, isBack }) => {
  const dpProps = {
    [isBack ? 'data-filter' : 'data-sort']: 'departure',
  };
  const arrProps = {
    [isBack ? 'data-filter' : 'data-sort']: 'arrived',
  };
  const baseStyle = {
    fa: true,
    'fa-filter': true,
  };
  const filterDp = classNames({ ...baseStyle, ...{ 'my-filter-on': departure.touch } });
  const filterAr = classNames({ ...baseStyle, ...{ 'my-filter-on': arrived.touch } });

  return (
    <div className="container-fluid">
      <div className="row results__tripshead" onClick={handlerSort}>
        <div className="col-md-3">
          <p className="routehead__sort" {...dpProps}>
            <span>отправление</span>
            {isBack ? (
              <i className={filterDp} aria-hidden="true" />
            ) : (
              <Arrow sorted={sorted} field="departure" />
            )}
          </p>
          {filter === 'departure' ? (
            <TimeFilter data={departure} changeTime={changeTime} id="departure" />
          ) : null}
        </div>
        <div className="col-md-2">
          <p className="routehead__sort" data-sort="waytime">
            <span>в пути</span>
            <Arrow sorted={sorted} field="waytime" />
          </p>
        </div>
        <div className="col-md-3">
          <p className="routehead__sort" {...arrProps}>
            <span>прибытие</span>
            {isBack ? (
              <i className={filterAr} aria-hidden="true" />
            ) : (
              <Arrow sorted={sorted} field="arrived" />
            )}
          </p>
          {filter === 'arrived' ? (
            <TimeFilter data={arrived} changeTime={changeTime} id="arrived" />
          ) : null}
        </div>
        <div className="col-md-2">
          <p className="routehead__sort" data-sort="freeseat">
            <span>своб.мест</span>
            <Arrow sorted={sorted} field="freeseat" />
          </p>
        </div>
        <div className="col-md-2">
          <p className="routehead__sort" data-sort="price">
            <span>цена</span>
            <Arrow sorted={sorted} field="price" />
          </p>
        </div>
      </div>
    </div>
  );
};

Title.defaultProps = {
  isBack: false,
};

Title.propTypes = {
  handlerSort: PropTypes.func.isRequired,
  sorted: PropTypes.shape({
    field: PropTypes.string,
    type: PropTypes.any,
  }).isRequired,
  filter: PropTypes.string.isRequired,
  departure: PropTypes.objectOf(PropTypes.any).isRequired,
  arrived: PropTypes.objectOf(PropTypes.any).isRequired,
  changeTime: PropTypes.func.isRequired,
  isBack: PropTypes.bool,
};

export default Title;
