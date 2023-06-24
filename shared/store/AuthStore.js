import { extendObservable, action } from 'mobx';
import cookie from 'react-cookie';

import { Authentication, Profile, Order } from '../utils/api';
import { getCustomState } from '../utils/store';
import { customDate } from '../utils/date';

export default class AuthStore {
  constructor(data = {}) {
    extendObservable(this, data);
  }

  @action
  /* set reason refund */ submitRefund() {
    const params = {
      access_token: this.access_token,
      data: {
        reason: this.refund.reason,
        method: this.refund.paymentMethod,
        tickets: this.refundData.slice(),
      },
    };

    if (this.refund.reason === 2) {
      params.data.other = this.otherReason || 'другая причина';
    }

    Order['set-refund'](params).then((json) => {
      const store = getCustomState();
      if (json.success === true) {
        this.refundState = false;
        this.getTickets();

        store.common.setSneckbar({
          open: true,
          msg: 'Ваша заявка успешно зарегестрирована.',
          action: '',
        });
      } else {
        store.common.setSneckbar({
          open: true,
          msg: 'Что-то пошло не так, повторите попытку позже.',
          action: '',
        });
      }
    });
  }

  @action
  /* set reason refund */ setReasonRefund(value) {
    this.refund.reason = value;
  }

  @action
  /* set print off refund */ setPrintOff(value) {
    this.printing = false;
  }

  @action
  /* set state refund */ setRefundState(value) {
    this.refundState = value;
  }

  @action
  /* set data refund */ setDataRefund(data) {
    const { buyId, ticketId } = data;

    this.refundData.replace([{ buyId, ticketId }]);
  }

  @action
  /* set other reason refund */ setOtherReason(value) {
    this.otherReason = value;
  }

  @action
  /* clear refund */ clearRefund() {
    this.refund = {
      reason: null,
      paymentMethod: null,
    };
    this.otherReason = '';
  }

  @action
  /* set payment method refund */ setPaymentMethodRefund(value) {
    this.refund.paymentMethod = value;
  }

  @action
  /* get data for ticket */ getDataTicket(buyid) {
    this.ticket = {};
    this.printing = false;
    const params = {
      buyid,
      access_token: this.access_token,
      copy: 1,
    };

    this.isLoading = true;
    Order['is-copy'](params).then((json) => {
      this.isLoading = false;

      if (json.success === true) {
        this.printTicket(json.data);
      }
    });
  }

  @action
  /* print */ printTicket(data) {
    this.ticket = data;
    this.printing = true;
  }

  @action
  /* get export link */ getRefundDoc(reqId) {
    const params = {
      reqId,
      access_token: this.access_token,
    };
    Order['doc-refund'](params).then((json) => {
      if (json.success === true && !json.data.message) {
        location.href = json.data;
      } else {
        const store = getCustomState();
        store.common.setSneckbar({
          open: true,
          msg: 'Сервис временно не доступен.',
          action: '',
        });
        return false;
      }
    });
  }

  @action
  /* get export link */ getExportLink(ticketid, type) {
    const params = {
      type,
      ticketid,
      access_token: this.access_token,
    };
    Profile.export(params).then((json) => {
      if (json.success === true && !json.data.message) {
        location.href = json.data;
      }
    });
  }

  @action
  /* set access_token */ setAccessToken(access_token) {
    this.access_token = access_token;
  }

  @action
  /* set refresh_token */ setRefreshToken(refresh_token) {
    this.refresh_token = refresh_token;
  }

  @action
  /* fetch uset data */ getUser() {
    const param = {
      access_token: this.access_token,
    };
    this.isLoading = true;
    Profile.list(param).then(json => this.setUserData(json));
  }

  @action
  /* set token */ setToken = (json, type) => {
    if (json.success === true) {
      this.access_token = json.data.access_token;
      if (type === 'list') this.getUser();
      if (type === 'tickets') this.getTickets();
    } else {
      location.replace('/');
    }
  };

  @action
  /* set user data */ setUserData = (json) => {
    if (json.status === 401) {
      const param = {
        device_id: localStorage.getItem('device_id'),
        refresh_token: this.refresh_token,
        access_token: this.access_token,
      };

      Authentication.refresh(param).then(res => this.setToken(res, 'list'));
      return true;
    }
    this.isLoading = false;
    if (json.success === true) {
      this.user = json.data;
      const data = JSON.stringify({ name: json.data.name, surname: json.data.surname });
      cookie.save('list', data, { path: '/' });
      return true;
    }
  };

  responseBodyLogout = () => {
    cookie.remove('access_token', { path: '/' });
    cookie.remove('refresh_token', { path: '/' });
    cookie.remove('list', { path: '/' });
    location.replace('/');
  };

  @action
  /* logout */ setLogout() {
    Authentication.signout({
      device_id: localStorage.getItem('device_id'),
      refresh_token: this.refresh_token,
      access_token: this.access_token,
    }).then(this.responseBodyLogout);
  }

  @action
  /* get tickets */ getTickets() {
    const param = {
      access_token: this.access_token,
    };
    this.isLoading = true;
    Profile.tickets(param).then(json => this.setTickets(json));
  }

  @action
  /* set tickets */ setTickets = (json) => {
    if (json.status === 401) {
      const param = {
        device_id: localStorage.getItem('device_id'),
        refresh_token: this.refresh_token,
        access_token: this.access_token,
      };

      Authentication.refresh(param).then(res => this.setToken(res, 'tickets'));
      return true;
    }
    this.isLoading = false;
    if (json.success === true) {
      const data = json.data.map((trip) => {
        if (trip.backDtDep && trip.backDtArr) {
          trip.backDtArrFormated = customDate.getFormatDate(trip.backDtArr);
          trip.backDtDepFormated = customDate.getFormatDate(trip.backDtDep);
          trip.backDateDepFormated = customDate.getFormatDateWithoutTime(trip.backDtDep);
          trip.backDateArrFormated = customDate.getFormatDateWithoutTime(trip.backDtArr);
        }
        trip.dtArrFormated = customDate.getFormatDate(trip.dtArr);
        trip.dtDepFormated = customDate.getFormatDate(trip.dtDep);
        trip.dateDepFormated = customDate.getFormatDateWithoutTime(trip.dtDep);
        trip.dateArrFormated = customDate.getFormatDateWithoutTime(trip.dtArr);
        return trip;
      });

      this.tickets.replace(data);
      return true;
    }
  };
}
