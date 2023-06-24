import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';

import AsyncHomeRoute from './pages/AsyncHomeRoute';
import AsyncScheduleRoute from './pages/AsyncScheduleRoute';
import AsyncSearchResultRoute from './pages/AsyncSearchResultRoute';
import AsyncAccountRoute from './pages/AsyncAccountRoute';
import AsyncDetailsRoute from './pages/AsyncDetailsRoute';
import AsyncDiscountsRoute from './pages/AsyncDiscountsRoute';
import AsyncCheckoutRoute from './pages/AsyncCheckoutRoute';
import AsyncBusRoute from './pages/AsyncBusRoute';
import AsyncAutobusRoute from './pages/AsyncAutobusRoute';
import AsyncAboutRoute from './pages/AsyncAboutRoute';
import AsyncFaqRoute from './pages/AsyncFaqRoute';
import AsyncOfertaRoute from './pages/AsyncOfertaRoute';
import AsyncLoyaltyRoute from './pages/AsyncLoyaltyRoute';
import AsyncContactsRoute from './pages/AsyncContactsRoute';
import AsyncSuccessRoute from './pages/AsyncSuccessRoute';
import AsyncErrorRoute from './pages/AsyncErrorRoute';
import AsyncSaleRoute from './pages/AsyncSaleRoute';
import PrivateRoute from './pages/PrivateRoute';
import CheckRoute from './pages/CheckRoute';
import Error404 from './pages/Error404';

export default (
  <Switch>
    <Route exact path="/" component={AsyncHomeRoute} />
    <Route path="/schedule" component={AsyncScheduleRoute} />
    <Route path="/search" component={AsyncSearchResultRoute} />
    <Route path="/sale" component={AsyncSaleRoute} />
    <Route path="/discounts" component={AsyncDiscountsRoute} />
    <Route path="/checkout/:id" component={AsyncCheckoutRoute} />
    <Route path="/details/:id" component={AsyncDetailsRoute} />
    <Route path="/line/:from/:to" component={AsyncBusRoute} />
    <CheckRoute path="/bus/:from/:to/:id" component={AsyncAutobusRoute} />
    <Route path="/buy/success" component={AsyncSuccessRoute} />
    <Route path="/buy/error" component={AsyncErrorRoute} />
    <Route path="/about-us" component={AsyncAboutRoute} />
    <Route path="/contact-us" component={AsyncContactsRoute} />
    <Route path="/kak-kupit" component={AsyncFaqRoute} />
    <Route path="/loyalty" component={AsyncLoyaltyRoute} />
    <Route path="/dogovor-oferty" component={AsyncOfertaRoute} />
    <PrivateRoute path="/account" component={AsyncAccountRoute} />
    <Route path="/trend/:data" render={() => <Redirect to="/" />} />
    <Route component={Error404} />
  </Switch>
);
