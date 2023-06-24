import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';

import Button from '../../_common/Button';
import BoardingTicket from '../../components/BoardingTicket';
import './success.scss';

@inject('download')
@observer
class SuccessRoute extends Component {
  state = {
    tickets: {},
  };

  componentDidMount() {
    const tickets = JSON.parse(localStorage.getItem('zub_tickets') || '{}');

    localStorage.setItem('zub_tickets', '{}');
    this.setState({
      tickets,
    });
    window.scrollTo(0, 0);
  }

  getTickets = () => {
    const { dateSold, orderNum, sum, timeSold, reserve, dateRes, timeRes } = this.state.tickets;

    return this.state.tickets.bl.map(ticket => (
      <BoardingTicket
        ticket={ticket}
        common={{ dateSold, orderNum, sum, timeSold, dateRes, timeRes, reserve }}
        key={Math.random()}
      />
    ));
  };

  download = () => {
    if (this.state.tickets.buyid) {
      this.props.download.getExportLink(this.state.tickets.buyid, 'buyid');
    }
  };

  print = () => {
    window.print();
  };

  render() {
    const { reserve } = this.state.tickets;

    return (
      <main className="success mycontainer">
        <Helmet>
          <title>Спасибо что воспользовались нашим сервисом</title>
        </Helmet>
        {reserve ? (
          <div className="success__text noprint">
            <p>Заявка на бронирование места принята.</p>
            <p>Информация для осуществления оплаты заказа отправлена Вам на электронную почту.</p>
            <p>Бланк заказа на бронирование места:</p>
          </div>
        ) : (
          <div className="success__text noprint">
            <p>
              Сервис ZUBUSTIK благодарит<br /> Вас за покупку!
            </p>
            <p>
              Билет отправлен Вам<br /> на электронную почту.
            </p>
          </div>
        )}
        <div className="success__btns row noprint">
          <div className="col-md-2 col-md-offset-4 show-desktop">
            <div className="btn btn--green" onClick={this.print}>
              Распечатать
            </div>
          </div>
          <div className="col-md-2">
            <div className="btn btn--green" onClick={this.download}>
              Загрузить
            </div>
          </div>
        </div>
        <div className="success__tickets">{this.state.tickets.bl ? this.getTickets() : null}</div>
      </main>
    );
  }
}

export default SuccessRoute;
