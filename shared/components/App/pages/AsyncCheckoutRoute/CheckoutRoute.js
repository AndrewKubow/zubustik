import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Snackbar from 'material-ui/Snackbar';
import Helmet from 'react-helmet';

import { getCustomState } from '../../../../utils/store';
import TextField from '../../_common/TextField';
import Checkbox from '../../_common/Checkbox';
import form from '../../../../forms/store/ContactInfo';
import PersonalInfo from './PersonalInfo';
import NoBus from './NoBus';
import Bus from './Bus';
import Trip from './Trip';
import './buy.scss';

const styled = {
  hint: {
    color: '#bababa',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
  },
  input: {
    color: '#ffffff',
    padding: 'none',
  },
  underline: {
    borderColor: '#ffffff',
  },
  error: {
    color: '#ffffff',
  },
};

@inject(allStores => ({
  auth: allStores.auth,
  checkout: allStores.checkout,
  common: allStores.common,
  navigation: allStores.navigation,
}))
@observer
class BuyRoute extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.checkout.clearSelectedPlace();
      this.props.checkout.fetchInfoTrip(id);
      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.stepIndex !== prevState.stepIndex) {
      window.scrollTo(0, 0);
    }
  }

  state = {
    finished: false,
    stepIndex: 0,
    mobilePassengersPassed: false,
  };

  handleNext = () => {
    const { stepIndex } = this.state;

    if (stepIndex === 0) {
      this.props.checkout.setTickets();
    }

    this.setState({
      loading: false,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    if (this.state.mobilePassengersPassed) {
      this.setState({
        mobilePassengersPassed: false,
      });
      return;
    }
    const { stepIndex } = this.state;
    if (stepIndex === 0) {
      this.props.history.goBack();
      return true;
    }

    this.setState({
      loading: false,
      stepIndex: stepIndex - 1,
    });
  };

  changePlaces = (raceId, e, key, value) => {
    this.props.checkout.setPlaces(value, raceId);
  };

  changeDiscount = (raceId, e, key, value) => {
    this.props.checkout.setDiscount(raceId, value);
  };

  choisePlace = (e, raceId) => {
    const { seat } = e.target.dataset;
    this.props.checkout.setPlaces(seat, raceId, true);
  };

  changeName = (e) => {
    const { id, name, value } = e.target;

    this.props.checkout.updateTickets(id, name, value);
  };

  onChangeCustomer = (e, newValue) => {
    this.props.checkout.setCustomerData(e.target.id, newValue);
  };

  toTop = () => {
    window.scrollTo(0, 0);
    this.props.navigation.showAdwMenu({ show: true, menu: 'signup' });
  };

  onSubmit = () => {
    this.props.checkout.onSuccess();
  };

  goToBuyerInfo = () => {
    const fields = document.querySelectorAll('.personal__textfield input');
    let hasError = false;

    // console.log('mobilePassengersPassed', this.state.mobilePassengersPassed);

    if (!fields || !fields.length) return;

    for (let i = 0; i < fields.length; ++i) {
      // console.log(fields[i].value);
      if (fields[i].value) continue;
      hasError = true;
      break;
    }

    // console.log('hasError', hasError);

    if (!hasError) {
      this.setState({
        mobilePassengersPassed: true,
      });
      window.scrollTo(0, 0);
      return;
    }

    const store = getCustomState();
    store.common.setSneckbar({
      open: true,
      msg: 'Заполните пожалуйста форму корректно.',
      action: '',
    });
  };

  isNextStepAvalible = checkout =>
    checkout.trip.info.filter((item) => {
      if (item.noPlaceNum || ((checkout.selectedPlacesBus || {})[item.raceId] || {}).length) {
        return false;
      }
      return true;
    }).length;

  handleReqClose = () => this.props.common.resetSneckbar();

  reservation = () => {
    this.props.checkout.reservation = true;
  };

  setPromo = (value) => {
    this.props.checkout.setPromocode(value);
  };

  getStepContent(stepIndex) {
    const { currency } = this.props.common;
    const isNoReserv = Boolean(this.props.checkout.trip.info.filter(trip => {
      return trip.canResv === 0;
    }).length);

    switch (stepIndex) {
      case 0:
        return (
          <div>
            {this.props.checkout.trip.info.map(item => (
              <div
                key={item.raceId}
                className={`select-seats${item.noPlaceNum
                  ? ' select-seats--without-number'
                  : ' select-seats--with-number'}`}
              >
                <div className="checkout__trip">
                  <Trip trip={item} currency={currency} />
                  {item.noPlaceNum ? (
                    <NoBus
                      places={item.places}
                      raceId={item.raceId}
                      changePlaces={this.changePlaces}
                      selected={this.props.checkout.selectedPlaces.get(item.raceId)}
                    />
                  ) : (
                    <Bus
                      busCapacity={item.busCapacity}
                      places={item.places}
                      choisePlace={this.choisePlace}
                      raceId={item.raceId}
                      selected={this.props.checkout.selectedPlacesBus[item.raceId]}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case 1:
        const { open, msg, duration } = this.props.common.snackbar;
        const isSignin = this.props.auth.user.id;
        if (isSignin) {
          form.$('phone').value = String(this.props.auth.user.phone);
          form.$('email').value = this.props.auth.user.email;
        }

        if (this.props.checkout.promocode.get('error')) {
          form.$('promo').invalidate('Данный промокод не действует на текущее направление.');
          form.$('promo').value = '';
        } else {
          form.$('promo').invalidate('');
        }
        let isPromo = true;
        const errors = form.errors();
        const cntBus = this.props.checkout.trip.info.length;

        return (
          <div className="select-seats">
            {this.props.checkout.trip.info.map((item, key) => {
              let count = null;
              const cBus = key + 1;

              if(item.isAction === 1) {
                isPromo = false;
              }
              if (item.autoLgot && !this.props.checkout.promocode.get('success')) {
                isPromo = false;
              }
              if (item.noPlaceNum) {
                count = this.props.checkout.selectedPlaces.get(item.raceId);
              } else {
                count = this.props.checkout.selectedPlacesBus[item.raceId].length;
              }
              const list = [];

              for (let i = 0; i < count; i++) {
                const data = this.props.checkout.tickets[item.raceId][i];
                const price = this.props.checkout.getPrice(item, data.lgot);

                list.push(
                  <PersonalInfo
                    autoLgot={item.autoLgot}
                    lgotes={item.lgotes}
                    raceId={item.raceId}
                    key={item.raceId + i}
                    number={i + 1}
                    price={price}
                    currency={currency}
                    data={data}
                    changeName={this.changeName}
                    changeDiscount={this.changeDiscount}
                    isDocNeed={item.countryFrom === 'RU'}
                    isAction={item.isAction === 1}
                  />,
                );
              }

              return (
                <div
                  className={`passengers-data${!this.state.mobilePassengersPassed
                    ? ' visible'
                    : ''}`}
                  key={item.raceId}
                >
                  <div className="checkout__trip">
                    <Trip trip={item} currency={currency} hidePrice />
                    <p className="passangers">Пассажиры:</p>
                    {list}
                  </div>
                  {cntBus === cBus ? (
                    <div className="checkout__row showmobileb">
                      <button className="btn" onClick={this.handlePrev}>
                        Назад
                      </button>
                      <button className="btn btn--green" onClick={this.goToBuyerInfo}>
                        Далее
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div className={`buyer-data${this.state.mobilePassengersPassed ? ' visible' : ''}`}>
              {this.getBuyerInfoBlock(isSignin, isPromo, errors)}
              <div className="summary">
                <div className="row">
                  <div className={isNoReserv ? 'col-xs-12 summary__col' : 'col-md-11 col-xs-12 summary__col'}>
                    Итого: {this.props.checkout.total}
                    <span className="currency">{currency}</span>
                    <div className="summary__submit">
                      <button
                        type="submit"
                        className="btn btn--transparent-white"
                        onClick={form.onSubmit}
                      >
                        КУПИТЬ
                      </button>
                    </div>
                    {!isNoReserv ?
                      <span>или</span>
                      : null
                    }
                    {!isNoReserv ? 
                      <span
                        className="summary__book"
                        onMouseDown={this.reservation}
                        onMouseUp={form.onSubmit}
                      >
                        забронировать
                      </span>
                      : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={duration}
              message={msg}
              onRequestClose={this.handleReqClose}
              className="snackbar"
            />
          </div>
        );
      default:
        return "You're a long way from home sonny jim!";
    }
  }

  renderContent() {
    const { stepIndex, mobilePassengersPassed } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

    return (
      <div className="bus-container">
        <div>{this.getStepContent(stepIndex)}</div>
        {this.props.checkout.trip.info.length ? (
          <div className="checkout__btns">
            {stepIndex != 1 || (stepIndex == 1 && mobilePassengersPassed == true) ? (
              <button className="btn" onClick={this.handlePrev}>
                Назад
              </button>
            ) : null}
            {stepIndex < 1 ? (
              <button
                className="btn btn--green"
                disabled={this.isNextStepAvalible(this.props.checkout)}
                onClick={this.handleNext}
              >
                Далее
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  getBuyerInfoBlock(isSignin, isPromo, errors) {
    return (
      <div className="buyer-info">
        <p className="buyer-info__title">Контактная информация</p>
        {!isSignin ? (
          <div className="row">
            <div className="col-md-7 col-md-offset-1 col-xs-12">
              <div className="row">
                <div className="col-md-6 phone">
                  <div className="buyer-info__field">
                    <span className="plus">+ </span>
                    <TextField field={form.$('phone')} type="tel" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="buyer-info__field">
                    <TextField field={form.$('email')} type="email" />
                  </div>
                </div>
              </div>
              {isPromo ? (
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                    <div className="buyer-info__field buyer-info__field-promo">
                      <TextField field={form.$('promo')} type="text" fullWidth />
                    </div>
                    <p className="buyer-info__promo">если есть</p>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="promo__submit nosignin">
                      <button
                        type="submit"
                        className="btn btn--transparent-white"
                        onClick={() => this.setPromo(form.$('promo').value)}
                      >
                        ОК
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12 show-desktop">&nbsp;</div>
                </div>
              ) : null}
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <div className={errors.terms ? 'terms-wrapper error' : 'terms-wrapper'}>
                    <Checkbox field={form.$('terms')} />
                  </div>
                </div>
              </div>
            </div>
            {isSignin ? null : (
              <div className="col-md-4 col-xs-12">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 col-xs-12 buyer-info__reginfo ">
                    <p className="text-center buyer-info__regtext">
                      <span className="buyer-info__reglink" onClick={this.toTop}>
                        Зарегистрируйтесь
                      </span>
                      <br />
                      это просто, а мы сможем дать вам скидку, возможность забронировать билеты и
                      связаться с вами по важным вопросам
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="row">
            <div className="col-md-3 col-md-offset-1 col-xs-12 phone">
              <div className="buyer-info__field">
                <span className="plus">+ </span>
                <TextField field={form.$('phone')} type="tel" />
              </div>
            </div>
            <div className="col-md-3 col-xs-12">
              <div className="buyer-info__field">
                <TextField field={form.$('email')} type="email" />
              </div>
            </div>
            {isPromo && (
              <div className="col-md-3 col-xs-12">
                <div className="buyer-info__field">
                  <TextField field={form.$('promo')} type="text" fullWidth />
                </div>
                <p className="buyer-info__promo">если есть</p>
              </div>
            )}
            {isPromo && (
              <div className="col-md-2 col-xs-12">
                {this.props.checkout.promocode.get('success') ? null : (
                  <div className="promo__submit">
                    <button
                      type="submit"
                      className="btn btn--transparent-white"
                      onClick={() => this.setPromo(form.$('promo').value)}
                    >
                      ОК
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {isSignin && (
          <div className="row">
            <div className="col-md-8 col-md-offset-1 col-xs-12">
              <div className={errors.terms ? 'terms-wrapper error' : 'terms-wrapper'}>
                <Checkbox field={form.$('terms')} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { stepIndex } = this.state;

    return (
      <div>
        <Helmet>
          <title>Покупка</title>
        </Helmet>
        <main className="checkout mycontainer">
          <div className="Stepper">
            <Stepper
              connector={null}
              activeStep={stepIndex}
              style={{ width: '100%', maxWidth: 500, margin: 'auto' }}
            >
              <Step>
                <StepLabel style={{ textTransform: 'uppercase', fontSize: 18, fontWeight: 300 }}>
                  1. Выбор места
                </StepLabel>
              </Step>
              <Step>
                <StepLabel style={{ textTransform: 'uppercase', fontSize: 18, fontWeight: 300 }}>
                  2. Оформление билета
                </StepLabel>
              </Step>
            </Stepper>
          </div>
          {this.renderContent()}
        </main>
      </div>
    );
  }
}

BuyRoute.defaultProps = {
  currency: '',
};

BuyRoute.wrappedComponent.propTypes = {
  currency: PropTypes.string,
  checkout: PropTypes.objectOf(PropTypes.any).isRequired,
  common: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BuyRoute;
