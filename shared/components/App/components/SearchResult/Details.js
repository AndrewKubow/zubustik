import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

import Toggle from '../../_common/Toggle';

import Routes from './Routes';
import Info from './Info';
import Button from '../../_common/Button';
import './details.scss';

class Details extends Component {
  toggle = (e, isInputChecked) => {
    this.setState({
      toggled: isInputChecked,
      show: Number(isInputChecked),
    });
  };

  getDiscount = (discount, bestOffers) => {
    const prefix = bestOffers ? 'до' : '~';

    return discount ? (
      <div className="col-md-1">
        <Paper zDepth={1} circle className="trip__discount">
          <span>
            {prefix}
            {discount}%
          </span>
        </Paper>
      </div>
    ) : null;
  };

  state = {
    toggled: false,
    show: 0,
  };

  render() {
    const { fullPrice, details, backward, hideBlock, segment, currency, tripId, seopage } = this.props;
    const detailsCol = classNames({
      'col-md-8': !(details && details.backward),
      'col-md-4': !!(details && details.backward),
    });
    const isChange = details ? details.length > 1 : false;
    const route = details ? details[this.state.show].raceName : '';

    return (
      <div>
        {segment && details.length !== 0 ? (
          <div className="row">
            <div className="col-md-8">
              <p className="race-name-header">Рейс: {details[0].raceName}</p>
            </div>
            {!seopage ? <div className="col-md-3">
              <p className="price-bestoffers">
                цена билета <span className="min-price">{details[0].price}</span>{' '}
                <span className="min-price__currency">{currency}</span>
              </p>
            </div> : null}
          </div>
        ) : null}
        <div className="row details">
          <div className={detailsCol}>
            {details ? <Routes details={details} segment={segment} /> : null}
          </div>
          <div className="col-md-4">
            {isChange ? (
              <Toggle
                label={route}
                onToggle={this.toggle}
                id="bus"
                toggled={this.state.toggled}
                style={{ marginLeft: 0 }}
              />
            ) : null}
            {details ? <Info data={details[this.state.show].info} seopage={seopage} /> : null}
          </div>
        </div>
        {backward ? (
          <div className="row details__buy">
            <div className="col-md-12">
              <div className="col-md-1 col-md-offset-9">
                <p>{fullPrice}</p>
              </div>
              <div className="col-md-2 buy-button">
                <Link to={`/checkout/${tripId}`} className="btn btn--green to-checkout">
                  <span>выбрать</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Details.PropTypes = {
  details: PropTypes.any,
  fullPrice: PropTypes.any,
};

export default Details;
