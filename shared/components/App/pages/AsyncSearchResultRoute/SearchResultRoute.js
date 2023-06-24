import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

import SearchModule from '../../components/SearchModule/';
import Calendar from '../../components/Calendar';
import SearchResult from '../../components/SearchResult';

import './searchResult.scss';

@inject(allStores => ({
  results: allStores.results,
  search: allStores.search,
  common: allStores.common,
}))
@observer
class SearchResultRoute extends Component {
  componentDidMount() {
    if (typeof window === 'object') {
      this.props.results.fetchTrips(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.props.results.fetchTrips(nextProps.location.search);
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
    const filter = e.target.dataset.filter
      ? e.target.dataset.filter
      : e.target.parentElement.dataset.filter;

    if (sort) {
      this.props.results.sortByType(sort);
      return true;
    }
    if (filter) {
      this.props.results.filterByTime(filter);
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
      <main className="results mycontainer">
        <Helmet>
          <title>Результат поиска</title>
        </Helmet>
        <h1>
          <span>Билеты на автобус</span>
          <br />{directionTitle}{this.props.results.tripsData.length ? directionPrice : null}
        </h1>
        {isBack ? (
          <SearchModule
            history={this.props.history}
            isBack
            searchParams={this.props.results.parse}
          />
        ) : (
          <div>
            <SearchModule history={this.props.history} searchParams={this.props.results.parse} />
            {this.props.results.tripsData.length && this.props.results.freePlaces ? (
              <Calendar
                cDate={this.props.results.when}
                calendar={this.props.results.dates}
                changeDay={this.setNewDate}
                avalibleDates={this.props.results.avalibleDates}
              />
            ) : null}
          </div>
        )}
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
      </main>
    );
  }
}

SearchResultRoute.defaultProps = {
  currency: '',
};

SearchResultRoute.wrappedComponent.propTypes = {
  currency: PropTypes.string,
  search: PropTypes.objectOf(PropTypes.any).isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  common: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SearchResultRoute;
