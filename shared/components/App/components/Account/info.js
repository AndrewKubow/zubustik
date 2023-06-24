import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';

import TextField from '../../_common/TextField';
import Checkbox from '../../_common/Checkbox';
import form from '../../../../forms/store/Account';
import formR from '../../../../forms/store/Reset';

import './info.scss';

@inject(allStores => ({
  auth: allStores.auth,
  common: allStores.common,
}))
@observer
class Info extends Component {
  componentDidMount() {
    this.props.auth.getUser();
  }

  state = {
    editable: false,
    changePass: false,
  };

  getPhone = () =>
    this.props.common.account.editable ? (
      <div className="info__field">
        <TextField fullWidth field={form.$('phone')} account value={this.props.auth.user.phone} />
      </div>
    ) : (
      <div className="info__text">{this.props.auth.user.phone}</div>
    );

  getFirstName = () =>
    this.props.common.account.editable ? (
      <div className="info__field">
        <TextField fullWidth field={form.$('name')} account value={this.props.auth.user.name} />
      </div>
    ) : (
      <div className="info__text">{this.props.auth.user.name}</div>
    );

  getLastName = () =>
    this.props.common.account.editable ? (
      <div className="info__field">
        <TextField
          fullWidth
          field={form.$('surname')}
          account
          value={this.props.auth.user.surname}
        />
      </div>
    ) : (
      <div className="info__text">{this.props.auth.user.surname}</div>
    );

  getEmail = () =>
    this.props.common.account.editable ? (
      <div className="info__field">
        <TextField
          field={form.$('email')}
          type="email"
          account
          fullWidth
          value={this.props.auth.user.email}
        />
      </div>
    ) : (
      <div className="info__text">
        <span className="email">{this.props.auth.user.email}</span>
        <span className="info__edit" onClick={this.handlerEdit} />
      </div>
    );

  getChangePass = () =>
    !this.props.common.account.changePass ? (
      <button className="btn" type="button" onClick={this.changePass}>
        СМЕНИТЬ ПАРОЛЬ
      </button>
    ) : (
      <form className="row" autoComplete="off" name="account">
        <div className="col-md-3">
          <div className="info__field">
            <TextField fullWidth field={formR.$('password')} type="password" account />
          </div>
        </div>
        <div className="col-md-3">
          <div className="info__field">
            <TextField fullWidth field={formR.$('confirm_password')} type="password" account />
          </div>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn info__pass-save-btn" onClick={formR.onSubmit}>
            ОК
          </button>
        </div>
      </form>
    );

  handlerEdit = () => {
    this.props.common.setAccountSettings({
      editable: true,
      changePass: false,
    });
  };

  changePass = () =>
    this.props.common.setAccountSettings({
      editable: false,
      changePass: true,
    });

  handleReqClose = () => this.props.common.resetSneckbar();

  render() {
    const { viber, telegram, watsapp } = this.props.auth.user;
    const { open, action, msg, duration } = this.props.common.snackbar;

    return (
      <div className="info">
        <Snackbar
          open={open}
          autoHideDuration={duration}
          action={action}
          onActionTouchTap={this.handleAction}
          message={msg}
          onRequestClose={this.handleReqClose}
        />
        <form>
          <div className="info__data">
            <div className="row">
              <div className="col-md-2 col-xs-12">
                <div>{this.getFirstName()}</div>
                <div>{this.getLastName()}</div>
              </div>
              <div className="col-md-3 col-xs-12">
                <div>{this.getPhone()}</div>
                <div>{this.getEmail()}</div>
              </div>
              {this.props.common.account.editable ? (
                <div className="col-md-2">
                  <p className="empty-row">&nbsp;</p>
                  <button type="button" className="btn info__save-btn" onClick={form.onSubmit}>
                    ОК
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="info__messengers" onClick={this.handlerEdit}>
            <Checkbox field={form.$('viber')} account checked={viber} />
            <Checkbox field={form.$('telegram')} account checked={telegram} />
            <Checkbox field={form.$('watsapp')} account checked={watsapp} />
          </div>
        </form>
        <div className="info__pass">{this.getChangePass()}</div>
      </div>
    );
  }
}

export default Info;
