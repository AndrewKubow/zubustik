import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import RaisedButton from 'material-ui/RaisedButton';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';

import Currency from '../Currency';
import IntlSwitch from '../Intl';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import './menu.scss';

@inject(allStores => ({
  navigation: allStores.navigation,
  auth: allStores.auth,
}))
@observer
class AdvancedMenu extends Component {
  toSignup = () => this.props.navigation.showAdwMenu({ show: true, menu: 'signup' });
  toSignin = () => this.props.navigation.showAdwMenu({ show: true, menu: 'signin' });
  toSupport = () => this.props.navigation.showAdwMenu({ show: true, menu: 'support' });
  toMobilemenu = () => this.props.navigation.showAdwMenu({ show: true, menu: 'mobilemenu' });

  handleClick = (e) => {
    const data = {
      show: !this.props.navigation.show,
      menu: e.target.dataset.menu,
    };
    this.props.navigation.showAdwMenu(data);
  };

  support = () => (
    <div className="menu__support">
      <div className="row">
        <div className="col-md-5 col-md-offset-1 col-xs-12 item__phone first">
          <a href="tel:+380934406622">+38 (093) 440-66-22</a>
        </div>
        <div className="col-md-6 col-xs-12 item__phone second">
          <a href="tel:+380974406622">+38 (097) 440-66-22 <span className="item__phone__label">(Viber & Telegram)</span></a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-md-offset-1 col-xs-12 item__phone first">
          <a href="tel:+380994406622">+38 (099) 440-66-22</a>
        </div>
        <div className="col-md-6 col-xs-12 item__phone second">
          <a href="tel:+380442228200">+38 (044) 222-82-00</a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-md-offset-4 col-xs-12 item__email">
          <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>
        </div>
      </div>
    </div>
  );

  handleLogout = () => {
    this.props.auth.setLogout();
  };

  checkUser = () =>
    (!this.props.auth.user.name && !this.props.auth.isLoading) || !this.props.auth.access_token;

  mobilemenu = () => {
    const isAuth = this.checkUser();

    return (
      <div className="mobilemenu">
        {isAuth && (
          <div className="mobilemenu__btns">
            <div className="mobilemenu__signin" onClick={this.toSignin}>
              Вход
            </div>
            <div className="mobilemenu__signup" onClick={this.toSignup}>
              Регистрация
            </div>
          </div>
        )}
        {!isAuth && (
          <div className="mobilemenu__user">
            <div className="mobilemenu__user-info">
              <span>
                {`${String(this.props.auth.user.name)
                  .charAt(0)
                  .toUpperCase()}${String(this.props.auth.user.surname)
                  .charAt(0)
                  .toUpperCase()}`}
              </span>
              <span>{this.props.auth.user.name}</span>
            </div>
            <ul className="mobilemenu__links">
              <li>
                <Link to="/account" onClick={this.handleCloseMenu}>
                  Мой профиль
                </Link>
              </li>
              <li>
                <Link to="/account/tickets" onClick={this.handleCloseMenu}>
                  Мои билеты
                </Link>
              </li>
              <li>
                <span onClick={this.handleLogout}>Выйти</span>
              </li>
            </ul>
          </div>
        )}
        <div className="currency_mobmenu">
          <span className="Currency">стоимость в:</span>
          <ul>
            <Currency isMobile />
          </ul>
        </div>
        <div className="intlswitch_mobmenu">
          <span className="IntlSwitch">язык:</span>
          <ul>
            <IntlSwitch isMobile />
          </ul>
        </div>
        <ul className="mobilemenu__links">
          <li className="mobilemenu__support">
            <span onClick={this.toSupport}>Служба поддержки</span>
          </li>
          <li>
            <Link to="/about-us" onClick={this.handleCloseMenu}>
              О нас
            </Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={this.handleCloseMenu}>
              Контакты
            </Link>
          </li>
          <li>
            <Link to="/kak-kupit" onClick={this.handleCloseMenu}>
              Вопросы и ответы
            </Link>
          </li>
          <li>
            <Link to="/loyalty" onClick={this.handleCloseMenu}>
              Программа лояльности
            </Link>
          </li>
          <li>
            <Link to="/dogovor-oferty" onClick={this.handleCloseMenu}>
              Договор оферты
            </Link>
          </li>
          <li>
            <Link to="/sale" onClick={this.handleCloseMenu}>
              Акция
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  getCurrentMenu = (current) => {
    if (current === 'support') {
      return this.support();
    } else if (current === 'mobilemenu') {
      return this.mobilemenu();
    } else if (current === 'signup') {
      return <SignUp />;
    } else if (current === 'signin') {
      return <SignIn signup={this.toSignup} />;
    }
    return null;
  };

  handleCloseMenu = () => this.props.navigation.showAdwMenu({});

  render() {
    const { show, currentMenu } = this.props.navigation;
    const child = this.getCurrentMenu(currentMenu);

    return (
      <Collapse isOpened={show}>
        <div className={`mycontainer advancedMenu menu noprint${show ? ' opened' : ''}`}>
          <div className="menu__inner">
            {currentMenu !== 'mobilemenu' && (
              <div className="menu__back" onClick={this.toMobilemenu} />
            )}
            {child}
          </div>
          <div className="menu__close" onClick={this.handleCloseMenu} />
        </div>
      </Collapse>
    );
  }
}

export default AdvancedMenu;
