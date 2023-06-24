import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '../../_common/Arrow';

const Header = ({ sorted, handlerSort }) => (
  <div className="container">
    <div className="row discount__routehead" onClick={handlerSort}>
      <div className="col-md-3">
        <p className="routehead__sort" data-sort="departure">
          <span>отправление</span>
          <Arrow sorted={sorted} field="departure" />
        </p>
      </div>
      <div className="col-md-3">
        <p className="routehead__sort" data-sort="waytime">
          <span>время в пути</span>
          <Arrow sorted={sorted} field="waytime" />
        </p>
      </div>
      <div className="col-md-3">
        <p className="routehead__sort" data-sort="arrived">
          <span>прибытие</span>
          <Arrow sorted={sorted} field="arrived" />
        </p>
      </div>
      <div className="col-md-2 col-md-offset-1">
        <p className="routehead__sort" data-sort="price">
          <span>цена</span>
          <Arrow sorted={sorted} field="price" />
        </p>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  handlerSort: PropTypes.func.isRequired,
  sorted: PropTypes.shape({
    field: PropTypes.string,
    type: PropTypes.any,
  }).isRequired,
};

export default Header;
