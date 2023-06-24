import { action, observable, computed, isObservable } from 'mobx';

import { getCustomState } from '../utils/store';
import { Trip, Order, Content } from '../utils/api';

export default class CheckoutStore {
  reservation = null;
  @observable isLoadingInfo = true;
  @observable isBuying = false;
  @observable isLoadingAdInfo = true;
  @observable selectedPlaces = new Map();
  @observable selectedPlacesBus = {};
  @observable tickets = {};
  @observable doctypes = [];
  @observable countries = [];
  @observable promocode = new Map();
  @observable
  customer = {
    phone: '',
    email: '',
    promo: '',
    terms: false,
    error: false,
  };
  @observable
  trip = {
    id: null,
    info: [],
  };

  @action
  /* fetch cuntries for aditional info */ fetchCountries() {
    this.isLoadingAdInfo = true;
    Content.countries().then(
      action('fetchCountriesSuccess', (json) => {
        if (json.success === true) {
          this.isLoadingAdInfo = false;
          this.countries.replace(json.data);
        }
      }),
    );
  }

  @action
  /* fetch doc types for aditional info */ fetchDocs() {
    this.isLoadingAdInfo = true;
    Content.doctypes().then(
      action('fetchDocsSuccess', (json) => {
        if (json.success === true) {
          this.isLoadingAdInfo = false;
          this.doctypes.replace(json.data);
        }
      }),
    );
  }

  @action
  /* clear prev selected */ clearSelectedPlace = () => {
    this.selectedPlacesBus = {};
    this.tickets = {};
    this.selectedPlaces.clear();
    this.trip = {
      id: null,
      info: [],
    };
  };

  @action
  /* get info current trip */ fetchInfoTrip = (id) => {
    this.isLoadingInfo = true;
    const store = getCustomState();
    const params = {
      id,
      access_token: store.auth.access_token,
    };
    Trip.trip(params).then((json) => {
      if (json.success === true) {
        this.setInfoTrip(json.data, id);
      }
    });
  };

  @action
  /* set customer data */ setCustomerData = (field, value) => {
    this.customer[field] = value;
  };

  @action
  /* set details */ setInfoTrip = (data, id) => {
    this.trip.id = id;
    data.forEach((item) => {
      if (item.noPlaceNum) {
        this.selectedPlaces.set(item.raceId, 1);
      }
    });
    this.trip.info.replace(data);
    this.isLoadingInfo = false;
  };

  @action
  /* set number of passangers */ setPlaces = (cSeat, raceId, bus) => {
    const value = Number(cSeat);

    if (bus) {
      if (!this.selectedPlacesBus[raceId]) {
        this.selectedPlacesBus[raceId] = [];
      }
      if (this.selectedPlacesBus[raceId].includes(value)) {
        this.selectedPlacesBus = Object.assign({}, this.selectedPlacesBus, {
          [raceId]: this.selectedPlacesBus[raceId].filter(seat => seat !== value),
        });
        return true;
      }
      this.selectedPlacesBus[raceId].push(value);
      this.selectedPlacesBus = Object.assign({}, this.selectedPlacesBus, {
        [raceId]: this.selectedPlacesBus[raceId],
      });
      return true;
    }
    this.selectedPlaces.set(raceId, value);
  };

  @action
  /* set data for tickets */ setTickets = () => {
    const newData = {};

    this.selectedPlaces.forEach((value, key) => {
      const trip = this.trip.info.filter(item => item.raceId === Number(key))[0];
      let aditional = {};

      if (trip.countryFrom === 'RU') {
        aditional = {
          birthDay: '',
          citizen: '',
          docType: '',
          sex: '',
        };
      }
      for (let i = 0; i < value; i++) {
        if (!newData[key]) {
          newData[key] = [];
        }
        newData[key].push({
          ...{
            bus: !trip.noPlaceNum,
            place: trip.places[i].num,
            name: '',
            lastName: '',
            lgot: 'full',
            passport: '',
            baggage: '',
            raceId: trip.raceId,
            error: false,
          },
          ...aditional,
        });
      }
    });

    Object.keys(this.selectedPlacesBus).forEach((key) => {
      const trip = this.trip.info.filter(item => item.raceId === Number(key))[0];
      const seats = this.selectedPlacesBus[key];
      let aditional = {};
      if (trip.countryFrom === 'RU') {
        aditional = {
          birthDay: '',
          citizen: '',
          docType: '',
          sex: '',
        };
      }
      for (let i = 0, l = seats.length; i < l; i++) {
        if (!newData[key]) {
          newData[key] = [];
        }
        newData[key].push({
          ...{
            bus: !trip.noPlaceNum,
            place: seats[i],
            name: '',
            lastName: '',
            lgot: 'full',
            passport: '',
            baggage: '',
            raceId: trip.raceId,
            error: false,
          },
          ...aditional,
        });
      }
    });

    this.tickets = Object.assign({}, this.tickets, newData);
  };

  validation = fields =>
    fields.name.length > 1 &&
    fields.lastName.length > 1 &&
    (fields.citizen === undefined ||
      (fields.birthDay && fields.citizen && fields.docType && fields.sex && fields.passport));

  @action
  /* set promocode */ setPromocode = (value) => {
    const store = getCustomState();
    const param = {
      promocode: value,
      trip_id: this.trip.id,
      access_token: store.auth.access_token,
    };
    Content.promo(param).then((json) => {
      if (json.success === true) {
        const data = json.data;
        const routeWithDiscount = data.filter(item => item.applicable !== 0);

        if (!routeWithDiscount.length) {
          this.promocode.set('error', true);
        } else {
          this.promocode.set('error', false);
          this.promocode.set('success', true);
          const tripWithPromo = this.trip.info.map((trip) => {
            const discount = routeWithDiscount.filter(promo => promo.raceId === trip.raceId);

            if (discount.length) {
              trip.autoLgot = discount[0].autoLgot;
            }
            return trip;
          });
          this.trip.info.replace(tripWithPromo);
          // this.promocode.set('error', false);
          // this.promocode.set('status', true);
          // this.promocode.set('routeWithDiscount', routeWithDiscount);
        }
      } else {
        let msg = json.data.message;
        if (json.status === 401) {
          msg = 'Использование промокода доступно только авторизированным пользователям.';
        }
        store.common.setSneckbar({
          open: true,
          msg: msg || 'Ошибка при проверке промокода.',
          action: '',
        });
      }
    });
  };

  @action
  /* on success */ onSuccess = (values, access_token) => {
    if (this.isBuying === true) return true;
    const params = {
      id: this.trip.id,
      reserve: this.reservation ? '1' : '0',
      places: [],
      access_token,
    };
    let success = true;
    this.customer = values;
    this.reservation = null;

    Object.keys(this.tickets).forEach((id) => {
      this.tickets[id].forEach((ticket, key) => {
        if (!this.validation(ticket)) {
          success = false;

          this.tickets[id][key] = Object.assign({}, this.tickets[id][key], { error: true });
          // this.tickets[id][key].error = true;
          return false;
        }
        this.tickets[id][key].error = false;

        let lgot = ticket.lgot;
        if (ticket.lgot === 'full') {
          const trip = this.trip.info.filter(item => item.raceId === Number(id))[0];
          lgot = trip.autoLgot ? trip.autoLgot.code : '';
        }

        params.places.push({
          ...ticket,
          ...this.customer,
          ...{ lgot },
        });
      });
    });
    if (params.reserve === '1' && !access_token) {
      const store = getCustomState();

      store.common.setSneckbar({
        open: true,
        msg: 'Бронирование доступно только для зарегестрированных пользователей.',
        action: '',
      });
      success = false;
    }
    if (!success) {
      return false;
    }

    this.isBuying = true;
    Order.buy(params).then((json) => {
      this.isBuying = false;
      if (json.success === true) {
        if (json.data.payref) {
          const payref = json.data.payref;
          delete json.data.payref;
          localStorage.setItem('zub_tickets', JSON.stringify(json.data));
          location.href = payref;
        } else {
          json.data.reserve = true;
          localStorage.setItem('zub_tickets', JSON.stringify(json.data));
          location.href = '/buy/success';
        }
      }
      if (json.status === 422) {
        const store = getCustomState();

        store.common.setSneckbar({
          open: true,
          msg: json.data.message,
          action: '',
        });
      }
    });
  };

  @action
  /* update tickets */ updateTickets = (id, name, value) => {
    const param = id.split('-');

    this.tickets[param[0]][param[1]][name] = value;
    this.tickets = Object.assign({}, this.tickets);
  };

  @action
  /* set discount */ setDiscount = (id, value) => {
    const param = id.split('-');

    this.tickets[param[0]][param[1]].lgot = value;
    this.tickets = Object.assign({}, this.tickets);
  };

  @action
  /* set discount */ setAditionalInfo = (id, field, value) => {
    const param = id.split('-');

    this.tickets[param[0]][param[1]][field] = value;
    this.tickets = Object.assign({}, this.tickets);
  };

  getPrice = (trip, discount) => {
    let cDiscount = null;

    if (discount === 'full') {
      return trip.autoLgot ? trip.autoLgot.price : trip.pricePass;
    }

    cDiscount = trip.lgotes.filter(disc => disc.code === discount)[0];
    return cDiscount.price;
  };

  @computed
  get total() {
    let total = 0;

    Object.keys(this.tickets).forEach((raceId) => {
      const trip = this.trip.info.filter(cTrip => cTrip.raceId === Number(raceId))[0];

      this.tickets[raceId].forEach((ticket) => {
        total += Number(this.getPrice(trip, ticket.lgot));
      });
    });

    return Number(total.toFixed(2));
  }
}
