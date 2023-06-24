import React from 'react';

import DatePicker from '../../_common/DatePicker';
import { customDate } from '../../../../utils/date';

import './footer.scss';

const styleDp = {
  inputStyle: {
    border: '2px solid #66bb6a',
    borderRadius: 25,
    cursor: 'pointer',
    backgroundColor: 'inherit',
  },
  main: {
    //paddingRight: 20,
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

const Footer = ({ depDates, wayHour, wayMinutes, handlerClick, rawTripId, seopage }) => (
  <div className="row">
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-8 col-md-offset-4">
          <p className="wayTime">Время в пути: <span>{`~${wayHour}ч ${wayMinutes}мин`}</span></p>
        </div>
      </div>
    </div>
    {!seopage ? <div className="col-md-2 col-md-offset-1">
      <DatePicker
        id={'buybutton'}
        label="КУПИТЬ БИЛЕТ"
        underlineShow={false}
        inputStyle={styleDp.inputStyle}
        style={styleDp.main}
        hintStyle={styleDp.hintStyle}
        type="button"
        onChange={(e, date) => handlerClick(date, rawTripId)}
        shouldDisableDate={day => lockDay(day, depDates)}
      />
    </div> : null}
  </div>
);

export default Footer;
