import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../../../public/img/new_logo.png';
import mlogo from '../../../../../public/img/zu_logo_small.png';


import Navigation from '../Navigation';
import './header.scss';

const Header = () => (
  <header className="header noprint">
    <div className="mycontainer">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-6">
          <Link to="/">
            <img className="img-responsive logo" height="75" width="200" src={logo} alt="Зубастик - логотип" />
            <img className="mobilelogo" height="54" width="162" src={mlogo} alt="Зубастик - логотип" />
          </Link>
        </div>
        <div className="col-md-9 col-sm-6 col-xs-6">
          <Navigation />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
