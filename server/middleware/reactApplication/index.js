import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { Provider, useStaticRendering } from 'mobx-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green400 } from 'material-ui/styles/colors';

import config from '../../../config';

import ServerHTML from './ServerHTML';
import App from '../../../shared/components/App';
import Store from '../../../shared/store';
import stringify from '../../../shared/utils/json/stringify';
import { getLang } from '../../../shared/utils/url';
import { setCustomState } from '../../../shared/utils/store';
import ua from '../../../lang/ua.json';
import ru from '../../../lang/ru.json';
import { Content, Trip } from '../../../shared/utils/api';
import { customDate } from '../../../shared/utils/date';

const langs = { ru, ua };
useStaticRendering(true);

/**
 * React application middleware, supports server side rendering.
 */
export function reactApplication(request, response, ceoData, searchData = {}) {
  const listUser = request.cookies.list ? JSON.parse(request.cookies.list) : {};
  const currentLang = getLang(request.url) || 'ru';
  const muiTheme = getMuiTheme(
    {
      palette: {
        primary1Color: green400,
      },
      datePicker: {
        selectColor: green400,
      },
      fontFamily: 'PF DinDisplay Pro',
    },
    {
      avatar: {
        borderColor: null,
      },
      userAgent: request.headers['user-agent'],
    },
  );
  // Ensure a nonce has been provided to us.
  // See the server/middleware/security.js for more info.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  const nonce = response.locals.nonce;

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (config('disableSSR')) {
    if (process.env.BUILD_FLAG_IS_DEV === 'true') {
      // eslint-disable-next-line no-console
      console.log('==> Handling react route without SSR');
    }
    // SSR is disabled so we will return an "empty" html page and
    // rely on the client to initialize and render the react application.
    const html = renderToStaticMarkup(<ServerHTML nonce={nonce} />);
    response.status(200).send(`<!DOCTYPE html>${html}`);
    return;
  }

  // Create a context for our AsyncComponentProvider.
  const asyncComponentsContext = createAsyncContext();

  // Create a context for <StaticRouter>, which will allow us to
  // query for the results of the render.
  const reactRouterContext = {};
  // Initialize the mobx store
  const store = new Store({
    common: {
      iscookie: true,
      locale: currentLang,
      enabledLanguages: ['ru'],
      ...langs[currentLang],
      current: +request.cookies.currency || 0,
      avalibleCurrency: ['UAH'],
      currency: '\u20B4',
      account: {
        editable: false,
        changePass: false,
      },
      snackbar: {
        open: false,
        msg: '',
        action: '',
        duration: 5000,
      },
    },
    auth: {
      refundState: false,
      otherReason: '',
      isLoading: false,
      user: {
        name: listUser.name || '',
        surname: listUser.surname || '',
      },
      refund: {
        reason: null,
        paymentMethod: null,
      },
      refundData: [],
      printing: false,
      tickets: [],
      ticket: {},
      errors: {},
      isLogin: false,
      refresh_token: request.cookies.refresh_token || '',
      access_token: request.cookies.access_token || '',
    },
    discount: {
      detailsTripDate: (ceoData && ceoData.currentDayTrips === undefined) ? (((ceoData.forward || [])[0] || {}).depDates || [])[0] : new Date(),
      detailsTrip: (ceoData && ceoData.currentDayTrips === undefined) ? ceoData : {},
      vipDisc: [],
      lazyitem: 0,
      citiesDep: [],
      citiesArr: [],
      allDisc: [],
      filtered: [],
      tripId: '',
      details: {},
      direction: '',
      filter: {
        departure: '',
        arrived: '',
      },
      sorted: {
        field: 'price',
        type: false,
      },
      isLoadingDisc: true,
      isLoadingDiscVip: true,
      isLoadingDetails: false,
    },
    search: {
      cities: [],
      isLoading: false,
      isLoadingPopular: true,
      date: '',
      popularFrom: [],
      popularTo: [],
      backdate: '',
      departure: searchData.departure || {},
      arrived: searchData.arrived || {},
      bothSide: false,
      directPath: false,
      cityTitle: {
        departure: (searchData.departure || {}).name || '',
        arrived: (searchData.arrived || {}).name || '',
      },
    },
    results: {
      freePlaces: false,
      trips: (ceoData && ceoData.currentDayTrips) ? ceoData.currentDayTrips : [],
      when: '',
      isLoadingTrips: false,
      isLoadingNoTrips: false,
      isLoading: false,
      animation: '',
      tripId: '',
      direction: '',
      details: {},
      parse: null,
      avalibleDates: (ceoData && ceoData.currentDayTrips) ? ceoData.dates : [],
      regularHelp: {
        isEmpty: false,
        nextRoute: null,
        forward: null,
        backward: null,
      },
      sorted: {
        field: 'price',
        type: false,
      },
      filter: {
        departure: {
          forward: [0, 24],
          back: [0, 24],
          touch: false,
        },
        arrived: {
          forward: [0, 24],
          back: [0, 24],
          touch: false,
        },
        field: '',
      },
    },
  });

  setCustomState(store);

  // Declare our React application.
  const app = (
    <AsyncComponentProvider asyncContext={asyncComponentsContext}>
      <Provider {...store}>
        <StaticRouter location={request.url} context={reactRouterContext} basename={currentLang}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </StaticRouter>
      </Provider>
    </AsyncComponentProvider>
  );

  // Pass our app into the react-async-component helper so that any async
  // components are resolved for the render.
  asyncBootstrapper(app).then(() => {
    const appString = renderToString(app);

    // Generate the html response.
    const html = renderToStaticMarkup(
      <ServerHTML
        reactAppString={appString}
        nonce={nonce}
        helmet={Helmet.rewind()}
        initialState={stringify(store)}
        asyncComponentsState={asyncComponentsContext.getState()}
      />,
    );

    // Check if the router context contains a redirect, if so we need to set
    // the specific status and redirect header and end the response.
    if (reactRouterContext.url) {
      response.status(302).setHeader('Location', reactRouterContext.url);
      response.end();
      return;
    }

    response
      .status(
        reactRouterContext.missed
          ? // If the renderResult contains a "missed" match then we set a 404 code.
            // Our App component will handle the rendering of an Error404 view.
            404
          : // Otherwise everything is all good and we send a 200 OK status.
            200,
      )
      .send(`<!DOCTYPE html>${html}`);
  });
}

export function reactApplicationAsync(request, response) {
  Content.cities().then(data => {
    const { from, to, id } = request.params;
    const cities = data.success ? data.data : [];
    const departure = cities.filter(
      item => item.nameEn.toLowerCase() === String(from).toLowerCase(),
    )[0];
    const arrived = cities.filter(
      item => item.nameEn.toLowerCase() === String(to).toLowerCase(),
    )[0];
    const searchData = {
      cities: cities,
      departure: departure,
      arrived: arrived,
    };

    const url = `?from=${departure.id}&to=${arrived.id}&rnum=${id}`;
    Trip.ceo(url)
        .then(function(body) {
          reactApplication(request, response, body.data, searchData);
        });
  });
}

export function reactApplicationAsyncLine(request, response) {
  Content.cities().then((data) => {
    const { from, to } = request.params;
    const cities = data.success ? data.data : [];
    const departure = cities.filter(
      item => item.nameEn.toLowerCase() === String(from).toLowerCase(),
    )[0];
    const arrived = cities.filter(
      item => item.nameEn.toLowerCase() === String(to).toLowerCase(),
    )[0];
    const searchData = {
      cities: cities,
      departure: departure,
      arrived: arrived,
    };
    const { getDateParse, getTomorrow } = customDate;
    const nextDay = getDateParse(getTomorrow(new Date()));

    const url = `?from=${departure.id}&to=${arrived.id}&when=${nextDay}`;
    Trip.searchWeek(url)
        .then(function(body) {
          reactApplication(request, response, body.data, searchData);
        });
  });
}
