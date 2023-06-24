import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import CircularProgress from 'material-ui/CircularProgress';
import Helmet from 'react-helmet';

import Title from '../../components/Segment/Title';
import Details from '../../components/SearchResult/Details';
import Footer from '../../components/Segment/Footer';
import Carrier from '../../components/Segment/Carrier';

import './segment.scss';

@inject(allStores => ({
  discount: allStores.discount,
  common: allStores.common,
}))
@observer
class DetailsRoute extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.discount.fetchDetailsTrip(id);
    }
    window.scrollTo(0, 0);
  }

  dateClick = (date, rawTripId) => {
    this.props.discount.fetchTripId(date, rawTripId, this.props.history);
  };

  render() {
    const { isLoadingDisc, detailsTrip } = this.props.discount;
    const trip = detailsTrip && detailsTrip.forward && detailsTrip.forward.length ? detailsTrip.forward : null;
    const { currency } = this.props.common;
    let dep = null;
    let arr = null;
    let rawTripId = null;

    if (trip) {
      const routes = trip[0].route;
      dep = routes[0].city;
      arr = routes[routes.length - 1].city;
      rawTripId = trip[0].rawTripId;
    }

    return (
      <div>
        <Helmet>
          <title>{`Подробно ${dep} - ${arr}`}</title>
        </Helmet>
        <main className="segment mycontainer">
          {isLoadingDisc ? (
            <div className="segment__progress">
              <CircularProgress size={80} thickness={5} />
            </div>
          ) : (
            <div>
              <Title dep={dep} arr={arr} className="container" />
              <div className="segment__details">
                <Details details={trip} segment currency={currency} />
                <Footer
                  className="container"
                  depDates={trip ? trip[0].depDates : null}
                  wayHour={trip ? trip[0].wayTimeH : null}
                  wayMinutes={trip ? trip[0].wayTimeM : null}
                  handlerClick={this.dateClick}
                  rawTripId={rawTripId}
                />
              </div>
              {/* <Carrier className="container" /> */}
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default DetailsRoute;
