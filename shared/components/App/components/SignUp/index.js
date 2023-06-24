import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { observer, inject } from 'mobx-react';

import TextField from '../../_common/TextField';
import Checkbox from '../../_common/Checkbox';
import form from '../../../../forms/store/Signup';

import './signup.scss';

@inject(allStores => ({
  navigation: allStores.navigation,
  common: allStores.common,
}))
@observer
class FormRoute extends Component {
  handleReqClose = () => this.props.common.resetSneckbar();
  handleAction = () => {
    this.props.navigation.setAdwMenu(true, 'signin');
  };
  toMobilemenu = () => this.props.navigation.showAdwMenu({ show: true, menu: 'mobilemenu' });
  handleCloseMenu = () => this.props.navigation.showAdwMenu({});

  render() {
    const { open, action, msg, duration } = this.props.common.snackbar;

    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={duration}
          action={action}
          onActionTouchTap={this.handleAction}
          message={msg}
          onRequestClose={this.handleReqClose}
        />
        <form autoComplete="off" className="signup-form">
          <div className="row">
            <div className="col-md-4 col-md-offset-2 col-xs-12">
              <div className="row">
                <div className="col-md-12 menu__field">
                  <TextField field={form.$('name')} type="text" />
                </div>
                <div className="col-md-12 menu__field">
                  <TextField field={form.$('surname')} type="text" />
                </div>
                <div className="col-md-12 phone menu__field">
                  <span className="plus">+ </span>
                  <TextField field={form.$('phone')} type="tel" />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-12">
              <div className="row">
                <div className="col-md-12 menu__field">
                  <TextField field={form.$('email')} type="email" />
                </div>
                <div className="col-md-12 menu__field">
                  <TextField field={form.$('password')} type="password" />
                </div>
                <div className="col-md-12 menu__field">
                  <TextField field={form.$('confirm_password')} type="password" />
                </div>
              </div>
            </div>
          </div>
          <div className="row signup-form__callback">
            <div className="col-md-4 col-md-offset-2 col-xs-12">
              <p>По этому телефону со мной можно связатсься через</p>
            </div>
            <div className="col-md-6 col-xs-12 signup-form__messengers">
              <Checkbox field={form.$('viber')} />
              <Checkbox field={form.$('telegram')} />
              <Checkbox field={form.$('watsapp')} />
            </div>
          </div>
          <div className="row oferatbtn ">
            <div className="col-md-5 col-md-offset-2 col-xs-12">
              <p className="signup-form__oferta">
                Нажимая кнопку регистрации, я принимаю условия договора оферты и не возражаю против
                обработки моих персональных данных и передачи их третьим лицам (перевозчику и пр.).
              </p>
            </div>
            <div className="col-md-3 col-xs-12 signup_btn">
              <button type="submit" onClick={form.onSubmit}>
                РЕГИСТРАЦИЯ
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormRoute;
