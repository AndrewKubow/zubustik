import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CircularProgress from 'material-ui/CircularProgress';
import Helmet from 'react-helmet';

import './discounts.scss';
import Filter from './Filter';
import Header from './Header';
import Trips from '../../components/SearchResult/Trips';

@inject(allStores => ({
  discount: allStores.discount,
  common: allStores.common,
}))
@observer
class DiscountsRoute extends Component {
  componentDidMount() {
    const { filteredDisconuts } = this.props.discount;

    if (!filteredDisconuts.length) {
      this.props.discount.fetchAllDisc();
    }
    window.scrollTo(0, 0);
  }

  handleClick = (cTripId, direction) => {
    const { tripId } = this.props.discount;
    const id = tripId && tripId === cTripId ? '' : cTripId;
    this.props.discount.setTripId(id, direction);
  };

  dateClick = (date, rawTripId) => {
    this.props.discount.fetchTripId(date, rawTripId, this.props.history);
  };

  handlerSort = (e) => {
    const sort = e.target.dataset.sort || e.target.parentElement.dataset.sort;

    if (sort) {
      this.props.discount.sortByType(sort);
      return true;
    }
  };

  render() {
    const {
      isLoadingDisc,
      filteredDisconuts,
      tripId,
      details,
      direction,
      isLoadingDetails,
      citiesDep,
      citiesArr,
      setFilter,
      clearFilter,
      sorted,
    } = this.props.discount;

    return (
      <div>
        <Helmet>
          <title>Скидки</title>
        </Helmet>
        <main className="discounts mycontainer">
          {isLoadingDisc ? (
            <div className="discount__progress">
              <CircularProgress size={80} thickness={5} />
            </div>
          ) : (
            <div>
              <h1 className="h1-title">Лучшие предложения</h1>
              <Filter
                clearFilter={clearFilter}
                citiesDep={citiesDep}
                citiesArr={citiesArr}
                setFilter={setFilter}
              />
              <Header sorted={sorted} handlerSort={this.handlerSort} />
              <Trips
                trips={filteredDisconuts}
                handlerPurchase={this.dateClick}
                handlerClick={this.handleClick}
                cDetails={tripId}
                details={details}
                isLoading={isLoadingDetails}
                direction={direction}
                currency={this.props.common.currency}
                bestOffers
              />
            </div>
          )}
        </main>
      </div>
    );
  }
}

DiscountsRoute.defaultProps = {
  currency: '',
};

DiscountsRoute.wrappedComponent.propTypes = {
  currency: PropTypes.string,
  discount: PropTypes.objectOf(PropTypes.any).isRequired,
  common: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DiscountsRoute;
