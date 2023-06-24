import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import { customDate } from '../../../../utils/date';
import DatePicker from '../../_common/DatePicker';
import './card.scss';

const style = {
  icon: {
    height: 13,
    width: 13,
    marginLeft: 5,
    marginRight: 5,
    color: '#ffffff',
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

const lockDay = (day, depDates) => {
  const cDay = new Date();

  if (Date.parse(day) < Date.parse(cDay) && day.getDate() !== cDay.getDate()) return true;
  const formatedDay = customDate.getDateParse(day);
  return !depDates.includes(formatedDay);
};

const CardComponent = (props) => {
  const {
    maxPercent,
    cityFromName,
    cityToName,
    img,
    price,
    tripId,
    depDates,
    rawTripId,
    depTime,
    id,
  } = props.data;
  let image = 'img-1.jpg';

  switch (id) {
    case 9006004:
      image = 'shec_2.png';
      break;
    case 198006030:
      image = 'mos.png';
      break;
    case 468005052:
      image = 'pozn.png';
      break;
    case 576006002:
      image = 'varsh.png';
      break;
    case 684005191:
      image = 'vor.png';
      break;
    case 738006024:
      image = 'shec.png';
      break;
  }
  const styledImg = {
    backgroundImage: `url('/img/${image}')`,
  };
  const styleHide = maxPercent ? {} : { opacity: 0 };
  const depTimeSplit = depTime.split(':');

  return (
    <div className="col-md-12 card">
      <Paper zDepth={1} rounded={false} style={style.paper}>
        <div className="card__header" style={styledImg}>
          {maxPercent ? (
            <div className="discount-wrapper">
              <span className="text first-text">скидки до</span>{' '}
              <span className="percent">{maxPercent}</span>
              <span className="text">%</span>
            </div>
          ) : null}
          <div className="direction-wrapper">
            <p className="direction">
              <span>{cityFromName}</span>
              <ArrowForward style={style.icon} />
              <span>{cityToName}</span>
            </p>
          </div>
        </div>
        <div className="card__body">
          <p className="dep-time">
            <span>время отправления</span>{' '}
            <span className="time-from">
              {depTimeSplit[0]}
              <sup>{depTimeSplit[1]}</sup>
            </span>
          </p>
          <div className="card__price">
            <span className="new">{price}</span>
            <span className="currency">{props.currency}</span>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <DatePicker
                id={''}
                label="КУПИТЬ"
                underlineShow={false}
                inputStyle={styleDp.inputStyle}
                style={styleDp.main}
                hintStyle={styleDp.hintStyle}
                type="button"
                onChange={(e, date) => props.handlerClick(date, rawTripId)}
                shouldDisableDate={day => lockDay(day, depDates)}
              />
            </div>
          </div>
        </div>
        <div className="card__footer">
          <Link to={`/details/${tripId}`}>
            детально про рейс <i className="fa fa-long-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default CardComponent;
