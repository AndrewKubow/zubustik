import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

import { customDate } from '../../../../utils/date';
import autobus from '../../../../../public/img/seo-autobus.png';
import sketch from '../../../../../public/img/sketch-route.png';
// import SearchModule from '../../components/SearchModule/';
import DatePicker from '../../_common/DatePicker';
import Details from '../../components/SearchResult/Details';
import Footer from '../../components/Segment/Footer';
import SEOText from '../../_common/SEOText/';

import './autobusroute.scss';

@inject(allStores => ({
  discount: allStores.discount,
  results: allStores.results,
  common: allStores.common
}))
@observer
class AutobusRoute extends Component {
  dateClick = (date, rawTripId) => {
    this.props.discount.fetchTripId(date, rawTripId, this.props.history);
  };

  lockDay = (day, depDates) => {
    const cDay = new Date();

    if (Date.parse(day) < Date.parse(cDay) && day.getDate() !== cDay.getDate()) return true;
    const formatedDay = customDate.getDateParse(day);
    return !depDates.includes(formatedDay);
  };

  handleSubmit = (rawTripId) => {
    const { detailsTripDate, detailsTrip } = this.props.discount;

    this.props.discount.fetchTripId(detailsTripDate, detailsTrip.forward[0].rawTripId, this.props.history);
  }

  changeData = (date, id) => {
    this.props.discount.setDetailsTripDate(date.date);
  }

  render() {
    const { currency } = this.props.common;
    const { detailsTrip } = this.props.discount;
    const trip =
      detailsTrip && detailsTrip.forward && detailsTrip.forward.length
        ? detailsTrip.forward
        : null;
    let dep = null;
    let arr = null;
    let rawTripId = null;
    let depDates = [];

    if (trip) {
      const routes = trip[0].route;
      dep = routes[0].city;
      arr = routes[routes.length - 1].city;
      rawTripId = trip[0].rawTripId;
      depDates = trip[0].depDates;
    }

    return (
      <main className="autobus-seo mycontainer">
        <Helmet>
          <title>{`Автобус ${dep} ${arr} - ${trip[0]
            .minPrice}${currency}.`}</title>
          <meta
            name="description"
            content="Самая выгодная цена. Удобное расписание. Комфортабельные автобусы. Служба поддержки."
          />
        </Helmet>
        <div className="row autobus-seo__sketch">
          <div className="col-md-10 col-md-offset-1 text-center">
            <div className="sketch__titleblock">
              <p className="sketch__title">
                Автобус {`${dep} - ${arr} ${trip[0].minPrice}${currency}`}{' '}
              </p>
            </div>
            <img src={sketch} alt="Зубастик - скетч" />
          </div>
        </div>
        <div className="row text-center autobus-seo__buy">
          <div className="col-md-3 col-md-offset-3">
            <DatePicker
              id="date"
              cDate={new Date(this.props.discount.detailsTripDate)}
              shouldDisableDate={day => this.lockDay(day, depDates)}
              changeData={this.changeData}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn--green" onClick={this.handleSubmit}>
              КУПИТЬ БИЛЕТ
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2>Почему стоит выбрать этот рейс?</h2>
          </div>
        </div>
        <SEOText price={trip[0].minPrice} />
        <div className="row">
          <div className="col-md-12">
            <h2>Расписание</h2>
          </div>
        </div>
        <div className="segment__details">
          {trip !== null ? (
            <Details details={trip} segment currency={currency} seopage />
          ) : null}
          <Footer
            depDates={trip ? trip[0].depDates : null}
            wayHour={trip ? trip[0].wayTimeH : null}
            wayMinutes={trip ? trip[0].wayTimeM : null}
            handlerClick={this.dateClick}
            rawTripId={rawTripId}
            seopage
          />
        </div>
        <div className="row autobus-seo__slidertext">
          <div className="col-md-8 col-md-offset-2">
            <h2>Автобусы на этом рейсе</h2>
            <p>
              Вот фотографии реальных автобусов, которые выполняют этот рейс.
              Они удобные и комфортные, в них есть кондиционер и работает
              отопление. В салонах есть Wi-Fi, работающий и на территории
              Польши, телевизоры и аудиосистема. Все автобусы оборудованы
              сиденьями, имеющими откидную спинку для выпрямления спины.
            </p>
            <p>
              Наши опытные и вежливые экипажи и круглосуточная служба
              обслуживания и сервиса сделает всё возможное, чтобы вы остались
              довольны поездкой и стали нашим постоянным гостем!
            </p>
          </div>
        </div>
        <div className="row autobus-seo__slider">
          <div className="col-md-8 col-md-offset-2 text-center">
            <img
              src={autobus}
              alt="Зубастик - автобус"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="row autobus-seo__contact">
          <div className="col-md-12 text-center">
            <h4>Есть еще вопросы по рейсу?</h4>
            <h4 className="primary">Позвоните или напишите нам.</h4>
            <div className="phonenumber">
              <p>
                <a href="tel:+380974406622">
                  +38(097)440-66-22 (Viber, Telegram)
                </a>
              </p>
              <p>
                <a href="tel:+380934406622">+38(093)440-66-22</a>
              </p>
              <p>
                <a href="tel:+380994406622">+38(099)440-66-22</a>
              </p>
              <p>
                <a href="tel:+380442228200">+38(044)222-82-00</a>
              </p>
            </div>
            <p className="autobus-seo__contact__mail">
              <a href="mailto:support@zubustik.com.ua">
                support@zubustik.com.ua
              </a>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default AutobusRoute;
