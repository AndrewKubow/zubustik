/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import config from '../../../config';
import ifElse from '../../../shared/utils/logic/ifElse';
import removeNil from '../../../shared/utils/arrays/removeNil';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';

import ClientConfig from '../../../config/components/ClientConfig';
import HTML from '../../../shared/components/HTML';

// PRIVATES

function KeyedComponent({ children }) {
  return Children.only(children);
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath) {
  return <link href={stylesheetFilePath} media="screen" rel="stylesheet" type="text/css" />;
}

function stylesheetPrintTag(stylesheetFilePath) {
  return <link href={stylesheetFilePath} media="print" rel="stylesheet" type="text/css" />;
}

function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={jsFilePath} />;
}

function googleTagManager() {
  return (
    <noscript>
      <iframe
        title="gtm"
        src="https://www.googletagmanager.com/ns.html?id=GTM-5TJRV28"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

function scriptAsyncTag(jsFilePath) {
  return <script type="text/javascript" async src={jsFilePath} />;
}

function scriptAsyncAndRocketTag(jsFilePath) {
  return <script type="text/javascript" async data-cfasync="true" src={jsFilePath} />;
}

// COMPONENT

function ServerHTML(props) {
  const { asyncComponentsState, helmet, nonce, reactAppString, initialState } = props;

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => (
    <script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />
  );

  const headerElements = removeNil([
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    ifElse(clientEntryAssets)(() => stylesheetTag(clientEntryAssets.css)),
    ifElse(true)(() => stylesheetPrintTag('/css/print.css')),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
    ifElse(process.env.BUILD_FLAG_IS_DEV !== 'true')(() =>
    //   inlineScript(`
    //   window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    //   ga('create', 'UA-76778606-1', 'auto');
    //   ga('send', 'pageview');
    // `),
      inlineScript(`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5TJRV28');
      `),
    ),
//     ifElse(process.env.BUILD_FLAG_IS_DEV !== 'true')(() =>
//       //scriptAsyncTag('https://www.google-analytics.com/analytics.js'),
//     //scriptAsyncTag('/analytics/api/analytics.js'),
// ),
  ]);

  const bodyElements = removeNil([
    ifElse(process.env.BUILD_FLAG_IS_DEV !== 'true')(() => googleTagManager()),
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfig nonce={nonce} />,
    // Bind our async components state so the client knows which ones
    // to initialise so that the checksum matches the server response.
    // @see https://github.com/ctrlplusb/react-async-component
    ifElse(asyncComponentsState)(() =>
      inlineScript(
        `window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${serialize(asyncComponentsState)};`,
      ),
    ),
    ifElse(initialState)(() => inlineScript(`window.__INITIAL_STATE__=${initialState}`)),
    // Enable the polyfill io script?
    // This can't be configured within a react-helmet component as we
    // may need the polyfill's before our client JS gets parsed.
    // ifElse(config('polyfillIO.enabled'))(() =>
    //   scriptAsyncTag(
    //     `${config('polyfillIO.url')}?features=${config('polyfillIO.features').join(',')}`,
    //   ),
    // ),
    ifElse(
      process.env.BUILD_FLAG_IS_DEV === 'true' && config('bundles.client.devVendorDLL.enabled'),
    )(() =>
      scriptAsyncTag(
        '//maps.googleapis.com/maps/api/js?key=AIzaSyB77sT_kYCxMCvPqKxqqupB4rAx9kFyGHY',
      ),
    ),
    // When we are in development mode our development server will
    // generate a vendor DLL in order to dramatically reduce our
    // compilation times.  Therefore we need to inject the path to the
    // vendor dll bundle below.
    ifElse(
      process.env.BUILD_FLAG_IS_DEV === 'true' && config('bundles.client.devVendorDLL.enabled'),
    )(() =>
      scriptTag(
        `${config('bundles.client.webPath')}${config(
          'bundles.client.devVendorDLL.name',
        )}.js?t=${Date.now()}`,
      ),
    ),
    ifElse(clientEntryAssets && clientEntryAssets.js)(() => scriptAsyncTag(clientEntryAssets.js)),
    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
    ifElse(process.env.BUILD_FLAG_IS_DEV !== 'true')(() =>
      scriptAsyncTag('/maps/api/js?key=AIzaSyB77sT_kYCxMCvPqKxqqupB4rAx9kFyGHY'),
    ),
  ]);

  return (
    <HTML
      htmlAttributes={ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null)}
      headerElements={headerElements.map((x, idx) => (
        <KeyedComponent key={idx}>{x}</KeyedComponent>
      ))}
      bodyElements={bodyElements.map((x, idx) => <KeyedComponent key={idx}>{x}</KeyedComponent>)}
      appBodyString={reactAppString}
    />
  );
}

ServerHTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  asyncComponentsState: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
  nonce: PropTypes.string,
  reactAppString: PropTypes.string,
};

// EXPORT

export default ServerHTML;
