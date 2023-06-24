import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Map from '../../_common/Map';
import './contacts.scss';

class ContactsRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="contacts-page mycontainer">
        <Helmet>
          <title>Контакты. Билеты на автобус - ZUBUSTIK.</title>
          <meta
            name="description"
            content="Дешевые билеты на автобус без посредников. Скидки. Быстрая покупка. Удобный способ оплаты. Служба поддержки. Тысячи довольных клиентов."
          />
        </Helmet>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="textpage-title">Контакты</h1>
            <div className="row">
              <div className="col-md-6">
                <h5 className="textpage-focus">Служба поддержки:</h5>
                <p className="contacts-page__list">
                  <a href="tel:+380974406622">+38 (097) 440-66-22 (Viber, Telegram)</a>
                </p>
                <p className="contacts-page__list">
                  <a href="tel:+380442228200">+38 (044) 222-82-00</a>
                </p>
                <p className="contacts-page__list">
                  <a href="tel:+380934406622">+38 (093) 440-66-22</a>
                </p>
                <p className="contacts-page__list">
                  <a href="tel:+380994406622">+38 (099) 440-66-22</a>
                </p>
                <p className="contacts-page__list-mail">
                  <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>
                </p>
                <div className="contacts-page__address">
                  <p>
                    <b>Режим работы:</b> с 8.00 до 20.00
                  </p>
                  <p>Офис компании ООО «БАС АЙ Т»:</p>
                  <p>г. Киев, ул. Шолуденка, 1б</p>
                </div>
              </div>
              <div className="col-md-6">
                <Map
                  initialCenter={{
                    lat: 50.451957,
                    lng: 30.48159,
                  }}
                  markers={[]}
                  markerContact={{
                    position: {
                      lat: 50.452025,
                      lng: 30.4771732,
                    },
                    title: 'Зубастик - билеты на автобус по честной цене',
                  }}
                  zoom={15}
                  contacts
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ContactsRoute;
