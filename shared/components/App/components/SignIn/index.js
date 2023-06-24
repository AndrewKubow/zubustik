import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router';

import TextField from '../../_common/TextField';
import Forgot from '../../components/Forgot';
import form from '../../../../forms/store/Signin';

import './signin.scss';

@inject(allStores => ({
  navigation: allStores.navigation,
  common: allStores.common,
}))
@withRouter
@observer
class FormRoute extends Component {
  state = {
    open: false,
  };

  toMobilemenu = () => this.props.navigation.showAdwMenu({ show: true, menu: 'mobilemenu' });
  handleCloseMenu = () => this.props.navigation.showAdwMenu({});

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleAction = () => this.props.history.push('/account');

  handleReqClose = () => this.props.common.resetSneckbar();

  render() {
    const { signup } = this.props;
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
        <form autoComplete="off" name="signin">
          <div className="row signin-form">
            <div className="col-md-3 col-md-offset-1">
              <div className="menu__field">
                <TextField field={form.$('login')} type="email" />
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1">
              <div className="menu__field">
                <TextField field={form.$('password')} type="password" />
              </div>
              <p className="helps" onTouchTap={this.handleOpen}>
                забыли пароль?
              </p>
            </div>
            <div className="col-md-3 col-md-offset-1 signin-form__submit">
              <div>
                <button type="submit" onClick={form.onSubmit}>Войти</button>
                <p className="helps" onClick={signup}>регистрация</p>
              </div>
            </div>
          </div>
        </form>
        <Forgot open={this.state.open} close={this.handleClose} />
      </div>
    );
  }
}
export default FormRoute;
