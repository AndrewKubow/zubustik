import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

import { customDate } from '../../../../utils/date';
import DatePicker from '../../_common/DatePicker';
import Arrow from '../../_common/Arrow';
import Map from '../../_common/Map';
import './city.scss';

const style = {
  marginBottom: 20,
  backgroundColor: '#fbfbfb',
};

const styleDp = {
  inputStyle: {
    border: '2px solid #66bb6a',
    borderRadius: 25,
    cursor: 'pointer',
    backgroundColor: 'inherit',
  },
  main: {
    paddingRight: 20,
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

@inject(allStores => ({
  schedule: allStores.schedule,
  common: allStores.common,
  discount: allStores.discount,
}))
@observer
class ScheduleCity extends Component {
  componentDidMount() {
    if (typeof window === 'object' && !this.props.schedule.schedules.length) {
      this.props.schedule.getSchedule(true);
    }
    const id = this.props.match.params.cityId;
    this.props.schedule.fetchCity(id);
    this.props.schedule.setCityId(id);
  }

  getPoints = points =>
    Object.keys(points).map((item, index) => {
      const obj = points[item];

      return (
        <li key={index} className="city-list">
          <Avatar
            color={`${this.props.schedule.filter.point === item ? '#ffffff' : '#000000'}`}
            backgroundColor={`${this.props.schedule.filter.point === item ? '#66bb6a' : '#d7d7d7'}`}
            size={44}
          >
            {index + 1}
          </Avatar>
          <div className="city-adress" data-point={item}>
            {`${obj.nameCity}, ${obj.addrSt}`}
          </div>
        </li>
      );
    });

  getRegularMsg = (regular) => {
    if (regular.id === 2) {
      return regular.days.map(day => day.name).join(', ');
    }

    return regular.name;
  };

  handleDate = (date, rawTripId) => {
    this.props.discount.fetchTripId(date, rawTripId, this.props.history);
  };

  lockDay = (day, depDates) => {
    const cDay = new Date();

    if (Date.parse(day) < Date.parse(cDay) && day.getDate() !== cDay.getDate()) return true;
    const formatedDay = customDate.getDateParse(day);
    return !depDates.includes(formatedDay);
  };

  getList = (list, currency) =>
    list.map((item, index) => {
      if (item.error) {
        return (
          <div className="row schedule__city__route">
            <div className="col-md-12">
              <p>В данный момент рейсов с этой остановки нет.</p>
            </div>
          </div>
        );
      }

      const [fromName, toName] = item.raceName.split('-');
      return (
        <Paper key={index} style={style}>
          <div className="row schedule__city__route">
            <div className="col-md-2">
              <p>
                <span className="fromName">{`${fromName}-`}</span>
                <br />
                <span className="toName">{toName}</span>
              </p>
            </div>
            <div className="col-md-3">
              <p className="route__time">{item.route[0].timeDep}</p>
              <p className="route__point">
                {`${item.route[0].stName},`}
                <br />
                {item.route[0].stAddr}
              </p>
            </div>
            <div className="col-md-3">
              <p className="route__time">{item.route[item.route.length - 1].timeArr}</p>
              <p className="route__point">
                {`${item.route[item.route.length - 1].stName},`}
                <br />
                {item.route[item.route.length - 1].stAddr}
              </p>
            </div>
            <div className="col-md-2">
              <p className="route__regular">{this.getRegularMsg(item.regular)}</p>
            </div>
            <div className="col-md-2">
              <p className="route__price">
                от {item.route[item.route.length - 1].price}{' '}
                <span className="currency">{currency}</span>
              </p>
              <DatePicker
                id={`${index}-selected`}
                label="ВЫБРАТЬ"
                shouldDisableDate={day => this.lockDay(day, item.depDates)}
                underlineShow={false}
                inputStyle={styleDp.inputStyle}
                style={styleDp.main}
                hintStyle={styleDp.hintStyle}
                type="button"
                onChange={(e, date) => this.handleDate(date, item.rawTripId)}
              />
            </div>
          </div>
        </Paper>
      );
    });

  handlerSort = (e) => {
    const sort = e.target.dataset.sort || e.target.parentElement.dataset.sort;

    if (sort) {
      this.props.schedule.sortByType(sort);
    }
  };

  getMap = (loading) => {
    if (!loading) {
      return (
        <Map
          initialCenter={this.props.schedule.center}
          markers={this.props.schedule.markers}
          zoom={10}
        />
      );
    }
  };

  handlerPoint = (e) => {
    const sort = e.target.dataset.point;
    if (sort) {
      this.props.schedule.sortByPoint(sort);
    }
  };

  render() {
    const points = Object.keys(this.props.schedule.points).length
      ? this.getPoints(this.props.schedule.points)
      : null;
    const list = this.props.schedule.dataRoutes.length
      ? this.getList(this.props.schedule.dataRoutes, this.props.common.currency)
      : null;
    const map = this.getMap(this.props.schedule.isLoading);
    const name = this.props.schedule.getCityName;

    return this.props.schedule.isLoading ? (
      <div className="container schedule__city">
        <div className="row">
          <div className="col-md-12 text-center loading">Loading...</div>
        </div>
      </div>
    ) : (
      <div className="container schedule__city">
        <div className="row">
          <div className="col-md-12">
            <Link to="/schedule" className="backToSchedule">
              <i className="fa fa-long-arrow-left schedule__arrow-left" aria-hidden="true" />
              <span>Назад</span>
            </Link>
          </div>
        </div>
        <h3 className="text-center">
          Расписание автобусов города
          <span className="city-selected"> {name}</span>
        </h3>
        <div className="row">
          <div className="col-md-6 map">{map}</div>
          <div className="col-md-6">
            <p>Доступные остановки</p>
            <ul onClick={this.handlerPoint}>{points}</ul>
          </div>
        </div>
        <div className="row schedule__city__routehead" onClick={this.handlerSort}>
          <div className="col-md-2">
            <p>рейс</p>
          </div>
          <div className="col-md-3">
            <p className="routehead__sort" data-sort="departure">
              <span>отправление</span>
              <Arrow sorted={this.props.schedule.filter} field="departure" />
            </p>
          </div>
          <div className="col-md-3">
            <p className="routehead__sort" data-sort="arrived">
              <span>прибытие</span>
              <Arrow sorted={this.props.schedule.filter} field="arrived" />
            </p>
          </div>
          <div className="col-md-2">
            <p>график</p>
          </div>
          <div className="col-md-2">
            <p className="routehead__sort" data-sort="price">
              <span>цена</span>
              <Arrow sorted={this.props.schedule.filter} field="price" />
            </p>
          </div>
        </div>
        {list}
      </div>
    );
  }
}

ScheduleCity.defaultProps = {
  currency: '',
};

ScheduleCity.wrappedComponent.propTypes = {
  currency: PropTypes.string,
  schedule: PropTypes.objectOf(PropTypes.any).isRequired,
  common: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  discount: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ScheduleCity;
