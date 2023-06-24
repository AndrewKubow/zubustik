import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Currency from '../Currency';
import IntlSwitch from '../Intl';
import Popover from '../../_common/Popover';
import './navigation.scss';

@inject(allStores => ({
  navigation: allStores.navigation,
  auth: allStores.auth,
}))
@observer
class Navigation extends Component {
  componentDidMount() {
    const { access_token } = this.props.auth;

    if (access_token) {
      this.props.auth.getUser();
    }
  }

  handleClick = (e) => {
    const data = {
      show: !this.props.navigation.show,
      menu: e.target.dataset.menu,
    };
    this.props.navigation.showAdwMenu(data);
  };

  handleLogout = () => {
    this.props.auth.setLogout();
  };

  userInfo = (user) => {
    if (
      (!this.props.auth.user.name && !this.props.auth.isLoading) ||
      !this.props.auth.access_token
    ) {
      return (
        <div className="user-info">
          <li className="signin" data-menu="signin" onClick={this.handleClick}>
            Вход
          </li>
          <span> | </span>
          <li className="signup" data-menu="signup" onClick={this.handleClick}>
            Регистрация
          </li>
        </div>
      );
    }

    return <Popover name={user.name} surname={user.surname} logout={this.handleLogout} />;
  };

  render() {
    const user = this.userInfo(this.props.auth.user);

    return (
      <nav className="navigation">
        <ul>
          <li className="support" data-menu="support" onClick={this.handleClick}>
            Служба поддержки
          </li>
          <li className="schedule">
            <Link className="calendar" to="/schedule">
              Расписание
            </Link>
          </li>
          {user}
          <Currency />
          <IntlSwitch />
          <li
            className="navigation__mobilemenu"
            data-menu="mobilemenu"
            onClick={this.handleClick}
          />
        </ul>
      </nav>
    );
  }
}

export default Navigation;
