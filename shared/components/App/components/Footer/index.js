import React from 'react';
import { Link } from 'react-router-dom';
import poweredBy from '../../../../../public/img/octobus_logo_bus_white.png';

import './footer.scss';

const Footer = () => (
  <footer className="footer noprint">
    <div className="mycontainer footer__wrapper">
      <div className="row social footer__row">
        <div className="col-md-7 footer__link">
          <Link to="/about-us">О нас</Link>
          <Link to="/contact-us">Контакты</Link>
          <Link to="/kak-kupit">Вопросы и ответы</Link>
          <Link to="/loyalty">Программа лояльности</Link>
          <Link to="/dogovor-oferty">Договор оферты</Link>
        </div>
        <div className="col-md-5 footer__support">
          <p className="footer__support__label">Служба поддержки:</p>
          <p className="footer__phone">
            <a href="tel:+380442228200">+38 (044) 222-82-00</a>
            <a href="tel:+380974406622">+38 (097) 440-66-22</a>
            <span>(Viber & Telegram)</span>
          </p>
          <p className="footer__phone">
            <a href="tel:+380934406622">+38 (093) 440-66-22</a>
            <a href="tel:+380994406622">+38 (099) 440-66-22</a>
            <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>
          </p>
        </div>
      </div>
      <div className="row payment footer__row">
        <div className="col-md-12 footer__group" />
      </div>
      <hr className="footer__divider" />
      <div className="row footer__row">
        <div className="col-md-7 col-xs-12">
          <p className="footer__copyright">
            {`© 2015-${new Date().getFullYear()}, ZUBUSTIK — Онлайн сервис продажи автобусных билетов. Все права защищены.`}
          </p>
        </div>
        <div className="col-md-3 col-xs-12 footer__bottom-link">
          <p className="footer__group social-icons">
            <span>Мы в соцсетях:</span>
            <a
              href="https://www.facebook.com/zubustik.ua"
              target="_blank"
              rel="noopener noreferrer"
              className="social-system"
            >
              <i className="fa fa-facebook fa-1x" />
            </a>
          </p>
        </div>
        <div className="col-md-2 col-xs-12 footer__bottom-link">
          <p className="footer__group">
            <i className="pw pw-mastercard payment-system" />
            <i className="pw pw-visa payment-system" />
          </p>
        </div>
      </div>
      <div className="row footer__row poweredby">
        <div className="col-md-12">
          <p className="footer__poweredby">
            Powered by
          </p>
          <a className="footer__poweredby" href="http://octobus.io">
            <img className="img-responsive" src={poweredBy} alt="Октобас" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
