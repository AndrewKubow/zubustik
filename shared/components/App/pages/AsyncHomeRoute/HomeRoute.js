import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

import SearchModule from '../../components/SearchModule';
import SEOBlock from '../../_common/SEOBlock';
import DiscountSlider from '../../components/DiscountSlider';
import PopularDestinations from '../../components/PopularDestinations';
import WhyUs from '../../_common/WhyUs';
import config from '../../../../../config';

@inject(allStores => ({
  homeRoute: allStores.homeRoute,
  discount: allStores.discount,
  common: allStores.common,
}))
@observer
class HomeRoute extends Component {
  state = {
    width: true,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.discount.fetchVipDisc();
    this.props.homeRoute.fetchPopular();
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        width: false,
      });
    }
  }

  dateClick = (date, rawTripId) => {
    this.props.discount.fetchTripId(date, rawTripId, this.props.history);
  };

  popularClick = (e) => {
    const target = e.currentTarget;
    const link = target.dataset.link;

    if (link) {
      this.props.homeRoute.setPopularRoute(this.props.history, link);
    }
  };

  render() {
    const { currency } = this.props.common;

    return (
      <div>
        <Helmet>
          <title>(ЗУБАСТИК) - сервис продажи автобусных билетов по лучшим ценам.</title>
          <meta
            name="description"
            content="Широкий выбор рейсов. Гибкая система скидок. Быстрая покупка. Удобный способ оплаты. Служба поддержки. Тысячи довольных клиентов."
          />
        </Helmet>
        <main className="mycontainer">
          <h1 className="h1-title">
            Билеты <span>на автобус</span>
            <br />по честной цене
          </h1>
          <SearchModule history={this.props.history} />
          <SEOBlock />
          {this.props.discount.isLoadingDiscVip ? null : (
            <DiscountSlider
              width={this.state.width}
              allDiscount={this.props.discount.vipDiscWithFixPrice}
              currency={currency}
              handlerClick={this.dateClick}
            />
          )}
          <PopularDestinations
            data={this.props.homeRoute.getPopular}
            handlerClick={this.popularClick}
            currency={currency}
          />
          <WhyUs />
        </main>
      </div>
    );
  }
}

export default HomeRoute;
