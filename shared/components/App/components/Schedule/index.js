import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import DropDown from '../../_common/DropDown';
import AutoComplete from '../../_common/AutoComplete';
import './schedule.scss';

const dataSourceConfigCity = {
  value: 'idCity',
  text: 'nameCity',
};

const styles = {
  customWidth: {
    width: '100%',
  },
  avatar: {
    margin: 5,
    marginBottom: 0,
  },
};

class Schedule extends Component {
  componentDidMount() {
    if (typeof window === 'object' && !this.props.schedule.schedules.length) {
      this.props.schedule.getSchedule();
    }
  }

  dropDownSelected = (event, index, value) => {
    const [category, selected] = value.split('-');
    this.props.schedule.setSelected(category, selected);
  };

  citySelected = (data) => {
    this.props.history.push(`/schedule/${data.data.idCity}`);
  };

  getCityLink = (url, cities) => (
    Object.keys(cities).map((letter, number) => {
      const clearClass = classNames({
        'col-md-3': true,
        clearfix: (number % 4) === 0,
      });
      return (
        <div className={clearClass} key={letter}>
          {cities[letter].map((item, key) => {
            const wrapperClass = classNames({
              'schedule__city-wrapper': true,
              'schedule__city-lonely': key !== 0,
            });
            return (
              <div className={wrapperClass} key={item.idCity}>
                {key !== 0 ? null : <Avatar size={30} style={styles.avatar}>{letter}</Avatar>}
                <Link to={`${url}/${item.idCity}`} className="schedule__city">
                  {item.nameCity}
                </Link>
              </div>
            );
          })}
        </div>
      );
    })
  );


  render() {
    const { schedules, country, getCities, getFilteredCities, isLoading } = this.props.schedule;
    const cities = getCities.length ? getCities[0].cities.slice() : [];
    const url = isLoading ? null : this.getCityLink(this.props.match.url, getFilteredCities);

    return isLoading
      ? <div className="container schedule__list">
        <div className="row">
          <div className="col-md-12 text-center loading">
              Loading...
            </div>
        </div>
      </div>
      : <div className="container schedule__list">
        <h3 className="text-center">Расписание автобусов по Украине, СНГ и Европе</h3>
        <div className="row">
          <div className="col-md-3 schedule__country">
            <DropDown
              callback={this.dropDownSelected}
              menuItem={schedules}
              category="country"
              selected={`country-${country}`}
              autoWidth={false}
              style={styles.customWidth}
            />
          </div>
          <div className="col-md-3 schedule__autocompete">
            <AutoComplete
              handleChange={this.citySelected}
              customConfig={dataSourceConfigCity}
              label={'ГОРОД'}
              source={cities}
              id={'city'}
            />
          </div>
        </div>
        <div className="schedule__cities row">
          {url}
        </div>
      </div>;
  }
}

export default inject('schedule')(observer(Schedule));
