/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import asyncBootstrapper from 'react-async-bootstrapper';
import { AsyncComponentProvider } from 'react-async-component';
import { toJS } from 'mobx';
import { Provider } from 'mobx-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { green400 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './polyfills';

import ReactHotLoader from './components/ReactHotLoader';
import App from '../shared/components/App';
import Store from '../shared/store';
import stringify from '../shared/utils/json/stringify';
import { setCustomState } from '../shared/utils/store';

injectTapEventPlugin();
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
  },
);

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Construct a new store with data from the server
let store = new Store(window.__INITIAL_STATE__);
const baseUrl = `${store.common.locale}`;
// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

// Get any rehydrateState for the async components.
// eslint-disable-next-line no-underscore-dangle
const asyncComponentsRehydrateState = window.__ASYNC_COMPONENTS_REHYDRATE_STATE__;

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <AsyncComponentProvider rehydrateState={asyncComponentsRehydrateState}>
        <Provider {...store}>
          <BrowserRouter forceRefresh={!supportsHistory} basename={baseUrl}>
            <MuiThemeProvider muiTheme={muiTheme}>
              <TheApp />
            </MuiThemeProvider>
          </BrowserRouter>
        </Provider>
      </AsyncComponentProvider>
    </ReactHotLoader>
  );

  // We use the react-async-component in order to support code splitting of
  // our bundle output. It's important to use this helper.
  // @see https://github.com/ctrlplusb/react-async-component
  asyncBootstrapper(app).then(() => render(app, container));
}

// Execute the first render of our app.
renderApp(App);
setCustomState(store);
// export const getStore = () => store;

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV === 'true' && module.hot) {
  if (module.hot.data && module.hot.data.store) {
    // Create new store with previous store state
    store = new Store(JSON.parse(module.hot.data.store));
  }

  // Disposed right before hot-loading new code
  module.hot.dispose((data) => {
    // Deserialize store and keep in hot module data for next replacement
    data.store = stringify(toJS(store)); // eslint-disable-line no-param-reassign
  });
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept('../shared/components/App', () => {
    renderApp(require('../shared/components/App').default);
  });

  // Make the store available in the window for debugging purposes
  window.store = store;
  // Filter out mobx store changed warnings.
  // Hot loading will always change the stores so suppression is needed.
  const warn = console.warn;
  console.warn = (firstArg, ...args) => {
    if (firstArg && /Provided store (.*) has changed/.test(firstArg)) {
      return;
    }
    warn.call(console, firstArg, ...args);
  };
}
