import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';

import Suggestions from '../../_common/Suggestions';
import DatePicker from '../../_common/DatePicker';
import ToggleSwitcher from '../../_common/Toggle';

import './search.scss';

class SearchModule extends Component {
  componentDidMount() {
    this.props.search.setSearchParams(this.props.history, (this.props.match || {}).params);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.search.paramURI !== nextProps.history.location.search) {
      this.props.search.setSearchParams(nextProps.history);
    }
  }

  switchRoute = () => this.props.search.toggleDestination();

  handleToggle = (event, isInputChecked) =>
    this.props.search.setAditionalParam(event.target.dataset.id, isInputChecked);

  citySelected = route => this.props.search.setRoute(route);

  validation = data =>
    (data.arrived && !data.arrived.name) ||
    (data.departure && !data.departure.name) ||
    !data.date ||
    (data.bothSide && !data.backdate);

  handleSubmit = () => {
    this.props.search.submit(this.props.history);
  };

  getDatePikers = (status) => {
    if (status) {
      return (
        <div className="search-module__field">
          <DatePicker
            className="hidden-xs hidden-sm"
            id="backdate"
            label="ДАТА ОБРАТНО"
            changeData={this.handleDate}
            minDate={this.props.search.date ? new Date(this.props.search.date) : new Date()}
            cDate={this.props.search.backdate ? new Date(this.props.search.backdate) : undefined}
          />
          <DatePicker
            className="visible-xs visible-sm"
            id="backdate"
            label="ДАТА ОБРАТНО"
            changeData={this.handleDate}
            minDate={this.props.search.date ? new Date(this.props.search.date) : new Date()}
            cDate={this.props.search.backdate ? new Date(this.props.search.backdate) : undefined}
            dialog
          />
        </div>
      );
    }

    return null;
  };

  handleDate = date => this.props.search.setDate(date);

  render() {
    const datepiker = this.getDatePikers(this.props.search.bothSide);

    const validation = this.validation(this.props.search);
    const textFieldGrid = classNames({
      'col-md-3 col-xs-12': this.props.search.bothSide,
      'col-md-4 col-xs-12': !this.props.search.bothSide,
    });
    const datepikerGrid = classNames({
      'col-xs-12': true,
      'search-module__date-btn': true,
      'col-md-6': this.props.search.bothSide,
      'col-md-4': !this.props.search.bothSide,
    });

    return (
      <div className="search-module">
        <div className="search-module__inner">
          <div className="row">
            <div className={`${textFieldGrid} search-module__field search-module__from`}>
              <Suggestions
                id="departure"
                label="ОТКУДА"
                city={this.props.search.departure.name}
                source={this.props.search.citiesData}
                handleChange={this.citySelected}
              />
            </div>
            <div className={`${textFieldGrid} search-module__field search-module__to`}>
              <i className="search__switch" onClick={this.switchRoute} />
              <Suggestions
                id="arrived"
                label="КУДА"
                city={this.props.search.arrived.name}
                source={this.props.search.citiesData}
                handleChange={this.citySelected}
              />
            </div>
            <div className={datepikerGrid}>
              <div className="search-module__field">
                <DatePicker
                  className="hidden-xs hidden-sm"
                  id="date"
                  label={this.props.search.bothSide ? 'ДАТА ТУДА' : 'ДАТА'}
                  changeData={this.handleDate}
                  minDate={new Date()}
                  cDate={this.props.search.date ? new Date(this.props.search.date) : null}
                />
                <DatePicker
                  className="visible-xs visible-sm search-module__mobile-datepicker"
                  id="date"
                  label={this.props.search.bothSide ? 'ДАТА ТУДА' : 'ДАТА'}
                  changeData={this.handleDate}
                  minDate={new Date()}
                  cDate={this.props.search.date ? new Date(this.props.search.date) : null}
                  dialog
                />
              </div>
              {datepiker}
              <div className="search-module__btn">
                <button
                  className="btn btn--green"
                  disabled={validation}
                  onClick={this.handleSubmit}
                >
                  НАЙТИ
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xs-12 search-module__direct-route">
            <ToggleSwitcher
              label="только прямые рейсы"
              id="directPath"
              onToggle={this.handleToggle}
              toggled={this.props.search.directPath}
            />
          </div>
          <div className="col-md-4 bothways">
            <ToggleSwitcher
              label="в обе стороны"
              onToggle={this.handleToggle}
              id="bothSide"
              toggled={this.props.search.bothSide}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default inject('search')(observer(SearchModule));
