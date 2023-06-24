import React from 'react';
import { observer, inject } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

import Error404 from '../Error404';

const CheckRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.discount.detailsTrip.forward ? (
        <Component {...props} />
      ) : (
        <Error404 {...props} />
      )}
  />
);

export default inject('discount')(observer(CheckRoute));
