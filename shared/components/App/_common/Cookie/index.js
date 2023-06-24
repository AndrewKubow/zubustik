import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './cookie.scss';

@inject('common')
@observer
class Cookie extends Component {

  componentDidMount() {
    if (typeof window === 'object') {
      this.props.common.checkIsCookie();
    }
  }

  onClickHandler = () => {
    this.props.common.setIsCookie();
    this.props.handleAcceptCookie();
  }

  render() {
    return (this.props.common.iscookie !== true) ? (
      <div className="cookieinfo">
        <div className="mycontainer">
          <div className="row">
            <div className="col-sm-12 col-md-10 vcenter">
              <p>Мы используем информацию, зарегистрированную в файлах «cookies», в частности, в рекламных и статистических целях, а также для того, чтобы адаптировать наши сайты к индивидуальным потребностям Пользователей. Вы можете изменить настройки касающиеся «cookies» в вашем браузере. Изменение настроек может ограничить функциональность сайта.</p>
            </div>
            <div className="col-sm-12 col-md-2 button-wrapper vcenter">
              <button type="submit" className="button" onClick={this.onClickHandler}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Cookie;
