import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Countdown from 'react-countdown-now';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru');
  require('intl/locale-data/jsonp/ru-RU');
}

import DatePicker from '../../_common/DatePicker';
import { customDate } from '../../../../utils/date';

class Trip extends Component {

  constructor(props) {
    super(props);

    const firstDate = this.getFormatedDate();
    const now = props.trip.srvTimeSec;

    this.state = {
      date: firstDate.day,
      count: firstDate.timestamp,
      canBuy: this.checkDate(firstDate),
      place: (now < firstDate.date) ? firstDate.place : 0,
      isTickets: now < firstDate.date,
    };
  }

  getDayStr = (days) => {
    let str = '';

    if (days === 0 || days > 4) {
      str = 'дней';
    } else if (days === 1) {
      str = 'день';
    } else {
      str = 'дня';
    }

    return str;
  }

  countDown = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
    if (completed) {
      if (this.state.canBuy) {
        return null;
      }
      // Render a completed state
      return <p className="sale__text sale__can no-ticket">Выберите другую дату.</p>;
    } else {
      // Render a countdown
      if (days) {
        const postfix = this.getDayStr(days);

        return <p className="sale__text sale__can"><span>{`${days}${postfix} ${hours}ч ${minutes}мин`}</span></p>;
      }

      return <p className="sale__text sale__can">Доступно через: <span className="lessday">{hours}:{minutes}:{seconds}</span></p>;
    }
  }

  checkDate = (date) => {
    const now = this.props.trip.srvTimeSec;

    return (now > date.timestamp) && (now < date.date);
  }

  getFormatedStringDate = (dateInString) => {
    const arr = dateInString.split(/[- :]/);

    return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);
  }

  getFormatedDate = (selectedDate) => {
    const { originDepTime, depDates, originDepTimeSec, depPlaces } = this.props.trip;
    const now = this.props.trip.srvTimeSec;
    let validDate;
    let timestamp;
    let place;

    if (!selectedDate) {
      validDate = depDates[0];
      timestamp = this.getFormatedStringDate(`${validDate} 00:00`).getTime() + (originDepTimeSec * 1000);
      place = depPlaces[0];
    } else {
      const searchDate = customDate.getDateParse(selectedDate);
      const index = depDates.indexOf(searchDate);

      validDate = selectedDate;
      timestamp = new Date(selectedDate).getTime() + (originDepTimeSec * 1000);
      place = index !== -1 ? depPlaces[index] : 0;
    }

    return {
      timestamp: timestamp - 10800000, // 3 hours
      day: new Date(validDate),
      date: timestamp,
      place: place,
    };
  }

  lockDay = (day, depDates) => {
    const cDay = new Date(this.props.trip.srvTimeSec);

    if (Date.parse(day) < Date.parse(cDay) && day.getDate() !== cDay.getDate()) return true;
    const formatedDay = customDate.getDateParse(day);
    return !depDates.includes(formatedDay);
  }

  onComplete = () => {
    this.setState({
      canBuy: true
    });
  }

  setDate = (e, date) => {
    const formatedDate = this.getFormatedDate(date);

    this.setState({
      date: formatedDate.day,
      count: formatedDate.timestamp,
      canBuy: this.checkDate(formatedDate),
      place: (this.props.trip.srvTimeSec < formatedDate.date) ? formatedDate.place : 0,
      isTickets: this.props.trip.srvTimeSec < formatedDate.date,
    });
  }

  onSubmit = () => {
    const { date, canBuy } = this.state;
    if (!canBuy) return false;

    this.props.handlerClick(date, this.props.trip.rawTripId);
  }

  getCntTiket = () => {
    const { place } = this.state;
    let str = '';

    if (place === 0 || place > 4) {
      str = 'билетов';
    } else if (place === 1) {
      str = 'билет';
    } else {
      str = 'билета';
    }

    return `${place} ${str}`;
  }

  getPrice(price) {
    const data = price.split('.');

    return {
      first: data[0],
      second: data[1] ? data[1] : '00',
    };
  }

  getResultString = () => {
    if (!this.state.isTickets) {
      return <p className="sale__text sale__can no-ticket">Выберите другую дату.</p>;
    }
    return <p className="sale__text sale__can">&nbsp;</p>;
  }

  render() {
    const { trip } = this.props;
    const price = this.getPrice(trip.price);
    const cntTiket = this.getCntTiket();
    const cntClass = this.state.place > 0 ? '' : 'tiket__warning';

    return (
      <div className="sale__trip col-md-6 col-sm-12">
        <Paper
          zDepth={1}
          style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}
        >
          <div className="row hr">
            <div className="col-sm-7 col-md-9 city-block">
              <p className="sale__direction city">{trip.cityFromName === 'Гожув-Велькопольский' ? 'Гожув-Вель...' : trip.cityFromName}</p>
              <p className="sale__direction city"><span className="only-desktop arrow">-</span>{trip.cityToName}</p>
            </div>
            <div className="col-sm-5 col-md-3 sale__price">
              <p className="sale__direction">
                <span className="price__first">{price.first}</span>
                <span className="price__second">.{price.second}</span>
                <span className="price__currency">грн</span></p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <p className="sale__text sale__dep">Отправление в <span>{trip.depTime}</span>.</p>
            </div>
            <div className="col-sm-12 col-md-7 text-right">
              {!this.state.canBuy && this.state.place > 0 ? <Countdown
                date={this.state.count}
                onComplete={this.onComplete}
                renderer={this.countDown}
              /> : this.getResultString()}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 only-desktop">
              <p className="sale__text sale__ticket">
                <i className={`fa fa-ticket ${cntClass}`} aria-hidden="true" />
                <span>{cntTiket}</span>
              </p>
            </div>
            <div className="col-sm-7 col-md-5">
              <DatePicker
                id={''}
                className="hidden-xs hidden-sm saledatepiker"
                value={this.state.date}
                formatDate={new DateTimeFormat('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                onChange={this.setDate}
                shouldDisableDate={day => this.lockDay(day, trip.depDates)}
              />
              <DatePicker
                id={''}
                className="visible-xs visible-sm saledatepiker"
                value={this.state.date}
                formatDate={new DateTimeFormat('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                onChange={this.setDate}
                shouldDisableDate={day => this.lockDay(day, trip.depDates)}
                dialog
              />
            </div>
            <div className="col-sm-5 col-md-3 text-right salesubmit">
              <button className="btn btn--green" disabled={!this.state.canBuy || this.state.place < 1} onClick={this.onSubmit}>Купить</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <p className="sale__owner">Перевозчик: {trip.carrier}</p>
            </div>
            <div className="col-sm-6 only-mobile">
              <p className="sale__text sale__ticket">
                <i className={`fa fa-ticket ${cntClass}`} aria-hidden="true" />
                <span>{cntTiket}</span>
              </p>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Trip;
