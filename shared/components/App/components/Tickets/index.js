import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';

import Title from './Title';
import Ticket from './Ticket';
import Refund from '../Refund';
import BoardingTicket from '../BoardingTicket';
import './tickets.scss';

@inject(allStores => ({
  auth: allStores.auth,
  common: allStores.common,
}))
@observer
class Tickets extends Component {
  componentDidMount() {
    this.props.auth.getTickets();
  }

  componentDidUpdate(prevProps, prevState) {
    const { ticket, printing } = this.props.auth;

    if (printing && ticket.bl) {
      this.props.auth.setPrintOff();
      window.print();
    }
  }

  ticketSave = (e) => {
    const { id } = e.target.dataset;

    if (id) {
      this.props.auth.getExportLink(id, 'ticketid');
    }
  };

  ticketPrint = (e) => {
    const { id } = e.target.dataset;

    if (id) {
      this.props.auth.getDataTicket(id);
    }
  };

  state = {
    openRefund: false,
    dataRefund: {},
  };

  handleOpenRefund = (e, data) => {
    this.props.auth.setDataRefund(data);
    this.props.auth.setRefundState(true);
    this.setState({ openRefund: true, dataRefund: data });
  };

  handleCloseRefund = () => {
    this.props.auth.setRefundState(false);
    this.setState({ openRefund: false, dataRefund: {} });
  };

  refundDoc = (e) => {
    const { id } = e.target.dataset;

    if (id) {
      this.props.auth.getRefundDoc(id);
    }
  };

  getTickets = (tickets) => {
    const { dateSold, orderNum, sum, timeSold, reserve, dateRes, timeRes } = tickets;

    return tickets.bl.map(ticket => (
      <BoardingTicket
        ticket={ticket}
        common={{ dateSold, orderNum, sum, timeSold, dateRes, timeRes, reserve }}
        key={Math.random()}
      />
    ));
  };

  handleReqClose = () => this.props.common.resetSneckbar();

  render() {
    const ticket = this.props.auth.ticket;
    const { open, action, msg, duration } = this.props.common.snackbar;
    const tickets = this.props.auth.tickets.length
      ? this.props.auth.tickets.map(item => (
        <Ticket
          data={item}
          key={Math.random()}
          ticketSave={this.ticketSave}
          ticketPrint={this.ticketPrint}
          openRefund={this.handleOpenRefund}
          refundDoc={this.refundDoc}
        />
        ))
      : null;
    return (
      <div className="account__tickets">
        <Snackbar
          open={open}
          autoHideDuration={duration}
          action={action}
          message={msg}
          onRequestClose={this.handleReqClose}
        />
        <div className="tickets noprint">
          <Title />
          {tickets}
          <Refund
            dataRefund={this.state.dataRefund}
            state={this.props.auth.refundState}
            handleCloseRefund={this.handleCloseRefund}
          />
        </div>
        <div className="prepere-for-print">
          {ticket.bl ? <div>{this.getTickets(ticket)}</div> : null}
        </div>
      </div>
    );
  }
}

export default Tickets;
