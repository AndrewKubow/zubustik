// import 'normalize.css/normalize.css';
import './globals.scss';

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import classNames from 'classnames';

import router from './router';
import config from '../../../config';
import AdvancedMenu from './components/AdvancedMenu';
import Header from './components/Header';
import Footer from './components/Footer';
import Cookie from './_common/Cookie';
import SaleWindow from './_common/Dialog';
import sale from '../../../public/img/sale.png';
import '../../utils/fingerprint';

function isCookie() {
  if (typeof window === 'object') {
    return /line/.test(window.location.pathname);
  }

  return false;
}

class App extends Component {

  state = {
    hideSale: false,
    showSale: false,  
  }

  componentWillMount() {
    if (typeof window === 'object' && localStorage.getItem('iscookie')) {
      setTimeout(this.showSaleSlowly, 3000);
    }
  }
  
  showSaleSlowly = () => {
    this.setState({
      showSale: true,
    });
  }

  handleAcceptCookie = () => {
    setTimeout(this.showSaleSlowly, 10000);
  }

  render () {
    const wrapperSale = classNames({
      'sale-background-img': true,
      'show-sale-link': this.state.showSale,
    });
    const imgSale = classNames({
      'img-sale': true,
      'show-sale-link': this.state.showSale,
    });
    return (
      <div>
        <Helmet titleTemplate={config('htmlPage.titleTemplate')}>
          <html lang="ru" />
          <meta charSet="utf-8" />
          <title>Главная</title>
          <meta name="application-name" content={config('htmlPage.defaultTitle')} />
          <meta name="description" content={config('htmlPage.description')} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="msapplication-TileColor" content="#2b2b2b" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#2b2b2b" />
          {/*
            A great reference for favicons:
            https://github.com/audreyr/favicon-cheat-sheet
            It's a pain to manage/generate them. I run both these in order,
            and combine their results:
            http://realfavicongenerator.net/
            http://www.favicomatic.com/
          */}
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicons/apple-touch-icon-114x114.png"
          />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#00a9d9" />
          <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
          <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2b2b2b" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        <AdvancedMenu />
        <div className="wrapper">
          <div>
            <Header />
            <div className="main-content">{router}</div>
            <Footer />
          </div>
        </div>
        { isCookie() ? null : <Cookie handleAcceptCookie={this.handleAcceptCookie} /> }
        { this.state.hideSale || this.props.location.pathname !== '/' ? null :
          <div className="">
            <div className={wrapperSale}>
              <i className="fa fa-times" aria-hidden="true" onClick={() => this.setState({hideSale: true})} />
            </div>
            <Link to="/sale" className={imgSale}>
              <img className="img-responsive" width="450" src={sale} />
            </Link>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(App);
