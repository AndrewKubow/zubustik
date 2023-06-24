import React, { Component } from 'react';

import Ticket from './Ticket';
import Footer from './Footer';

import './boardingticket.scss';

class BoardingTicket extends Component {
  render() {
    const { retCond, luggCond } = this.props.ticket;
    const { reserve } = this.props.common;

    return (
      <div className="boarding-ticket">
        <div className="boarding-ticket ticket-page-break">
          <Ticket common={this.props.common} ticket={this.props.ticket} key={'first'} />
          {reserve ? null : (
            <Ticket common={this.props.common} ticket={this.props.ticket} key={'second'} />
          )}
          <Footer retCond={retCond} luggCond={luggCond} reserve={reserve} />
        </div>
      </div>
    );
  }
}

export default BoardingTicket;
