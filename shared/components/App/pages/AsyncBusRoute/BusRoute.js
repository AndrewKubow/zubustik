import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

import SearchModule from '../../components/SearchModule/';
import SearchResult from '../../components/SearchResult';
import Popular from './Popular';
import About from './About';
import Calendar from '../../components/Calendar';

import './busroute.scss';

@inject(allStores => ({
  results: allStores.results,
  search: allStores.search,
  common: allStores.common,
  homeRoute: allStores.homeRoute,
}))
@observer
class BusRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  popularClick = (e) => {
    const target = e.currentTarget;
    const link = target.dataset.link;

    if (link) {
      this.props.homeRoute.setPopularRoute(this.props.history, link);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.search.setSearchParams(this.props.history, (nextProps.match || {}).params);
    }
  }

  handleClick = (tripId, direction) => {
    const id = this.props.results.tripId && this.props.results.tripId === tripId ? '' : tripId;
    this.props.results.setTripId(id, direction);
  };

  setNewDate = (date, hide, show) => {
    this.props.results.setAnimationOut(date, hide, show);
    this.props.results.setDate(date, this.props.history);
  };

  handlerSort = (e) => {
    const sort = e.target.dataset.sort || e.target.parentElement.dataset.sort;

    if (sort) {
      this.props.results.sortByType(sort);
      return true;
    }
  };

  render() {
    const isBack = this.props.results.parse ? Boolean(+this.props.results.parse.goback) : false;
    const nextRoute = isBack ? false : this.props.results.regularHelp;
    const regularHelp = isBack ? this.props.results.regularHelp : false;
    const directionTitle = `${this.props.search.cityTitle.departure} - ${this.props.search.cityTitle
      .arrived}`;
    const directionPrice = ` от ${this.props.results.lowPrice}${this.props.common.currency}`;

    return (
      <main className="bus-segment mycontainer">
        <Helmet>
          <title>
            {`Билеты на автобус ${directionTitle}, расписание, купить, цена ${directionTitle} – ZUBUSTIK`}
          </title>
          <meta
            name="description"
            content={`Купить билеты на автобус ${directionTitle} от перевозчика. Цена ${directionPrice}. Скидки. Быстрая покупка. Удобный способ оплаты. Служба поддержки. Тысячи довольных клиентов.`}
          />
        </Helmet>
        <h1>
          <span>Билеты на автобус</span>
          <br />
          {directionTitle}
          {this.props.results.tripsData.length ? directionPrice : null}
        </h1>
        <SearchModule
          history={this.props.history}
          searchParams={this.props.results.parse}
          match={this.props.match}
        />
        {this.props.results.tripsData.length ? (
          <div className="show-mobile">
            <Calendar
              cDate={this.props.results.when}
              calendar={this.props.results.dates}
              changeDay={this.setNewDate}
              avalibleDates={this.props.results.avalibleDates}
            />
          </div>
        ) : null}
        <SearchResult
          handlerSort={this.handlerSort}
          animation={this.props.results.animation}
          trips={this.props.results.tripsData}
          sorted={this.props.results.sorted}
          click={this.handleClick}
          cDetails={this.props.results.tripId}
          details={this.props.results.details}
          isLoading={this.props.results.isLoading}
          isLoadingTrips={this.props.results.isLoadingTrips}
          isLoadingNoTrips={this.props.results.isLoadingNoTrips}
          filter={this.props.results.filter.field}
          departure={this.props.results.filter.departure}
          arrived={this.props.results.filter.arrived}
          changeTime={this.props.results.changeTime}
          isBack={isBack}
          direction={this.props.results.direction}
          nextRoute={nextRoute}
          regularHelp={regularHelp}
          changeDay={this.setNewDate}
          currency={this.props.common.currency}
          freePlaces={this.props.results.freePlaces}
        />
        {!this.props.search.isLoadingPopular ? (
          <Popular
            departureName={this.props.search.cityTitle.departure}
            arrivedName={this.props.search.cityTitle.arrived}
            departure={this.props.search.popularfrom}
            arrived={this.props.search.popularto}
            handlerClick={this.popularClick}
            currency={this.props.common.currency}
          />
        ) : null}
        {this.props.results.lowPrice ? (
          <About
            departureCity={this.props.search.cityTitle.departure}
            arrivedCity={this.props.search.cityTitle.arrived}
            lowPrice={this.props.results.lowPrice}
          />
        ) : null}
      </main>
    );
  }
}

export default BusRoute;
