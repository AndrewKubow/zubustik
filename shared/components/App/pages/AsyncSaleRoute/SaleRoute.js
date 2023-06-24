import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Helmet from 'react-helmet';

import './sale.scss';
import Filter from './Filter';
import Header from './Header';
import Trips from './Trips';

@inject(allStores => ({
  auth: allStores.auth,
  discount: allStores.discount,
  common: allStores.common,
}))
@observer
class DiscountsRoute extends Component {
  componentDidMount() {
    const { filteredDisconuts } = this.props.discount;

    if (!filteredDisconuts.length) {
      this.props.discount.fetchAllSale();
    }
    window.scrollTo(0, 0);
  }

  dateClick = (date, rawTripId) => {
    const isSignin = this.props.auth.user.id;

    if (isSignin) {
      this.props.discount.fetchTripId(date, rawTripId, this.props.history);
    } else {
      this.props.common.setSneckbar({
        open: true,
        msg: 'Данное акционное предложение только для авторизованых пользователей.',
        action: '',
      });
    }
  };

  loadMore = () => {
    this.props.discount.setLazyitem();
  }

  render() {
    const { open, msg, duration } = this.props.common.snackbar;
    const {
      isLoadingDisc,
      filteredSale,
      tripId,
      details,
      direction,
      isLoadingDetails,
      citiesDep,
      citiesArr,
      setFilter,
      clearFilter,
      sorted,
      allDisc
    } = this.props.discount;
    const isMore = !(filteredSale.length === allDisc.length);

    return (
      <div>
        <Helmet>
          <title>Сервис продажи автобусных билетов – ZUBUSTIK Акционные билеты.</title>
          <meta
            name="description"
            content="Дешевые билеты на автобус. Быстрая покупка. Удобная оплата. Служба поддержки. Тысячи довольных клиентов."
          />
        </Helmet>
        <main className="salepage mycontainer">
          {isLoadingDisc ? (
            <div className="discount__progress">
              <CircularProgress size={80} thickness={5} />
            </div>
          ) : (
            <div>
              <h1 className="h1-title">Акционные билеты</h1>
              <Filter
                clearFilter={clearFilter}
                citiesDep={citiesDep}
                citiesArr={citiesArr}
                setFilter={setFilter}
              />
              <p className="only-auth-user">* Покупка акционных билетов возможна только для авторизированных пользователей.</p>
              <Trips
                trips={filteredSale}
                currency={this.props.common.currency}
                handlerClick={this.dateClick}
              />
              <Snackbar
                open={open}
                autoHideDuration={duration}
                message={msg}
                onRequestClose={this.handleReqClose}
                className="snackbar"
              />
              { isMore ?
                <div className="row">
                  <div className="col-sm-12">
                    <p className="text-center">
                      <FlatButton
                        className="btn-loadmore"
                        label="ПОКАЗАТЬ ЕЩЕ"
                        onClick={this.loadMore}
                      />
                    </p>
                  </div>
                </div>
                : null
              }
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
