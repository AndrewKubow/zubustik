import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrow.scss';

function getClass(sorted, item) {
  return classNames({
    'fa sort-arrow': true,
    'fa-caret-down': !(sorted.type && sorted.field === item),
    'fa-caret-up': !!(sorted.type && sorted.field === item),
    'sort-selected': sorted.field === item,
  });
}

const Arrow = ({ sorted, field }) => {
  const arrowClass = getClass(sorted, field);
  return <i className={arrowClass} />;
};

Arrow.propTypes = {
  field: PropTypes.string.isRequired,
  sorted: PropTypes.shape({
    field: PropTypes.string,
    type: PropTypes.any,
  }).isRequired,
};

export default Arrow;
