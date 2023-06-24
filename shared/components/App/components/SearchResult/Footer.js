import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { customDate } from '../../../../utils/date';
import DatePicker from '../../_common/DatePicker';
import './footer.scss';

const style = {
  icon: {
    height: 13,
    width: 13,
    marginLeft: 5,
    marginRight: 5,
  },
  paper: {
    fontFamily: 'PF DinDisplay Pro',
  },
};

const styleDp = {
  inputStyle: {
    border: '2px solid #66bb6a',
    borderRadius: 25,
    cursor: 'pointer',
    backgroundColor: 'inherit',
  },
  main: {
    // paddingRight: 20,
  },
  hintStyle: {
    textAlign: 'center',
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    backgroundColor: '#66bb6a',
    paddingTop: 11,
    borderRadius: 25,
    color: '#ffffff',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    fontFamily: 'PF DinDisplay Pro',
    fontSize: 16,
    fontWeight: 500,
  },
};

class Footer extends Component {
  lockDay = (day, depDates) => {
    const cDay = new Date();

    if (Date.parse(day) < Date.parse(cDay) && day.getDate() !== cDay.getDate()) return true;
    const formatedDay = customDate.getDateParse(day);
    return !depDates.includes(formatedDay);
  };

  getButton = () => {
    if (this.props.bestOffers) {
      return (
        <div className="trip__date-btn">
          <DatePicker
            className="hidden-xs hidden-sm"
            id={''}
            label="КУПИТЬ"
            underlineShow={false}
            inputStyle={styleDp.inputStyle}
            style={styleDp.main}
            hintStyle={styleDp.hintStyle}
            type="button"
            onChange={(e, date) => this.props.handlerPurchase(date, this.props.rawTripId)}
            shouldDisableDate={day => this.lockDay(day, this.props.depDates)}
          />
          <DatePicker
            className="visible-xs visible-sm"
            id={''}
            label="КУПИТЬ"
            underlineShow={false}
            inputStyle={styleDp.inputStyle}
            style={styleDp.main}
            hintStyle={styleDp.hintStyle}
            type="button"
            onChange={(e, date) => this.props.handlerPurchase(date, this.props.rawTripId)}
            shouldDisableDate={day => this.lockDay(day, this.props.depDates)}
            dialog
          />
        </div>
      );
    }
    if (!this.props.places) {
      return null;
    }
    return (
      <Link to={`/checkout/${this.props.tripId}`} className="btn btn--green to-checkout">
        <span>выбрать</span>
      </Link>
    );
  };

  onToggleDetails = () => {
    this.props.cb(this.props.tripId, this.props.direction);
  };

  render() {
    const { cDetails, tripId, carrier, isBack } = this.props;
    const detailsClass = classNames({
      trip__details__down: tripId !== cDetails,
      trip__details__up: tripId === cDetails,
    });

    return (
      <div className="row results__trip second-row">
        <div className="col-md-8">
          {carrier ? <p className="trip__owner">{`Перевозчик: ${carrier}`}</p> : null}
        </div>
        <div className="col-md-2">
          <p className={detailsClass} onClick={this.onToggleDetails}>
            Подробно
          </p>
        </div>
        <div className="col-md-2">{isBack ? null : this.getButton()}</div>
      </div>
    );
  }
}

Footer.PropTypes = {
  cDetails: PropTypes.object,
  cb: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  carrier: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Footer;
