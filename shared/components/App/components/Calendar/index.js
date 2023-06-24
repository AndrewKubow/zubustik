import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { customDate } from '../../../../utils/date';
import './calendar.scss';

class Calendar extends Component {
  getWeek = today =>
    this.props.calendar.map((date, key) => {
      const isDisable = date < today;
      const item = `calendar__key${key}`;
      const timeClass = classNames({
        calendar__item: true,
        disabled: isDisable,
        [item]: true,
      });
      return (
        <div
          className={timeClass}
          key={date.getTime()}
          onClick={
            isDisable ? null : this.props.changeDay.bind(null, date, 'fadeOutDown', 'fadeIn')
          }
        >
          <p>
            {`${date.getDate()} ${customDate.getMonth(date)}`} <br />
            {customDate.getWeekday(date)}
          </p>
        </div>
      );
    });

  render() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    const cDay = this.props.cDate;
    const week = this.getWeek(today);
    const prev = customDate.getYesterday(cDay);
    const next = customDate.getTomorrow(cDay);
    const prevClass = classNames({
      calendar__prev: true,
      disabled: prev <= today,
    });

    return (
      <div className="calendar">
          <div
            className={prevClass}
            onClick={
              prev > today
                ? this.props.changeDay.bind(null, prev, 'bounceOutRight', 'bounceInLeft')
                : null
            }
          />
          {week}
          <div
            className="calendar__next"
            onClick={this.props.changeDay.bind(null, next, 'bounceOutLeft', 'bounceInRight')}
          />
      </div>
    );
  }
}

Calendar.PropTypes = {
  cDate: PropTypes.object.isRequired,
  calendar: PropTypes.array.isRequired,
  changeDay: PropTypes.func.isRequired,
};

export default Calendar;
