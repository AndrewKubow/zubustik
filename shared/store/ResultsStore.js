import { action, observable, computed, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import queryString from 'query-string';

import { getCustomState } from '../utils/store';
import { customDate } from '../utils/date';
import { Trip } from '../utils/api';

export default class ResultsStore {
  constructor(data = {}) {
    data.when = new Date();
    extendObservable(this, data);
  }

  show = '';

  checkFilter = id =>
    this.filter[id].forward.toString() === [0, 24].toString() &&
    this.filter[id].back.toString() === [0, 24].toString();

  @action
  /* change time */ changeTime = (data, id) => {
    if (data === false) {
      this.filter.field = '';
      return true;
    }
    this.filter[id] = { ...this.filter[id], ...data, ...{ touch: true } };
    if (id && this.checkFilter(id)) {
      this.filter[id].touch = false;
    }
  };

  @action
  /* filter by time */ filterByTime = (data) => {
    const cField = this.filter.field;
    this.filter.field = cField && cField === data ? '' : data;
  };

  @action
  /* set animation out */ setAnimationOut = (date, hide, show) => {
    if (this.when.getTime() === date.getTime()) return false;
    this.animation = `animated ${hide}`;
    this.show = `animated ${show}`;
  };

  @action
  /* set new date */ setDate = (date, history) => {
    const nDate = customDate.getDateParse(date);
    let url = '';

    if (this.when === date) return false;

    this.parse.when = nDate;
    url = `?${queryString.stringify(this.parse)}`;
    history.push(`/search${url}`);
  };

  @computed
  get lowPrice() {
    let lowPrice = null;

    this.trips.forEach((item) => {
      const price = item.discPrice ? Number(item.discPrice) : Number(item.price);

      if (lowPrice === null) {
        lowPrice = price;
      } else {
        lowPrice = lowPrice > price ? price : lowPrice;
      }
    });
    return lowPrice;
  }

  @action
  /* get resutls by route */ fetchTrips = (param) => {
    this.parse = queryString.parse(param);
    this.when = new Date(this.parse.when);
    this.isLoadingTrips = true;
    Trip.search(param).then((json) => {
      if (json.success === true) {
        this.setTrips(json.data.currentDayTrips, json.data.dates);
      }
    });
  };

  @action
  /* get details data */ fetchDetails = (id) => {
    this.isLoading = true;
    const store = getCustomState();
    const param = {
      id,
      access_token: store.auth.access_token,
    };

    Trip.route(param).then((json) => {
      if (json.success === true) {
        this.setDetails(json.data, id);
      }
    });
  };

  @action
  /* get closest date */ fetchRegularRoute = (param) => {
    this.isLoadingNoTrips = true;
    Trip['detail-info'](param).then(this.setRegular);
  };

  @action
  /* set regular */ setRegular = (json) => {
    if (json.success === true) {
      const isEmpty = !json.data.length;
      const isBack = Boolean(+this.parse.goback);

      if (isEmpty) {
        this.regularHelp.isEmpty = isEmpty;
        this.isLoadingNoTrips = false;
        return true;
      }

      if (isBack) {
        const forward = json.data.filter(item => +item.ctFromId === +this.parse.from);
        const backward = json.data.filter(item => +item.ctFromId === +this.parse.to);

        this.regularHelp.forward = forward[0];
        this.regularHelp.backward = backward[0];
      } else {
        // const cDay = new Date(this.parse.when || customDate.getTomorrow(new Date()));
        // const cDayOfWeek = cDay.getDay();
        // let diff = null;
        
        // TODO заменить на массив дат (баг с неверным отображением даты)
        const depDatesArr = (orderBy(json.data, 'depDates', 'asc')[0] || {}).depDates;
        this.regularHelp.nextRoute = new Date(depDatesArr[0]);

        // json.data.forEach((item) => {
        //   if (item.regular && item.regular.id === 2) {
        //     const day = item.regular.days[0];
        //     if (cDayOfWeek < day.id) {
        //       diff = (day.id - cDayOfWeek) * 1000 * 60 * 60 * 24;

        //       this.regularHelp.nextRoute = new Date(cDay.getTime() + diff);
        //     } else {
        //       diff = (7 - cDayOfWeek + day.id) * 1000 * 60 * 60 * 24;
        //       this.regularHelp.nextRoute = new Date(cDay.getTime() + diff);
        //     }
        //   }
        //   if (item.regular && item.regular.id === 3) {
        //     while (cDay.getDate() % 2 !== 0) {
        //       cDay.setDate(cDay.getDate() + 1);
        //     }
        //     this.regularHelp.nextRoute = cDay;
        //   }
        //   if (item.regular && item.regular.id === 5) {
        //     this.regularHelp.nextRoute = new Date(cDay.getTime() + 1000 * 60 * 60 * 24);
        //   }
        // });
      }
    }

    this.isLoadingNoTrips = false;
  };

  @action
  /* set details */ setDetails = (json, id) => {
    this.details[id] = json;
    this.isLoading = false;
  };

  @action
  /* set tripId for details */ setTripId = (id, direction) => {
    this.tripId = id;
    this.direction = direction;
    if (id === '' || this.details[id]) return false;
    this.fetchDetails(id);
  };

  @action
  /* set trips */ setTrips = (trips, avalibleDates) => {
    if (trips.length === 0) {
      const { from, to, goback } = this.parse;
      let param = `?from=${from}&to=${to}`;

      if (goback) {
        param += `&goback=${goback}`;
      }
      this.regularHelp = {
        isEmpty: false,
        nextRoute: null,
        forward: null,
        backward: null,
      };
      this.fetchRegularRoute(param);
    }
    const data = trips.map((trip) => {
      let dateDep,
        dateArr,
        timeDep,
        timeArr,
        backDateDep,
        backDateArr,
        backTimeDep,
        backTimeArr;
      if (trip.backDtDep && trip.backDtArr) {
        [backDateDep, backTimeDep] = trip.backDtDep.split(' ');
        [backDateArr, backTimeArr] = trip.backDtArr.split(' ');
        trip.backDateDep = customDate.getFormatDateWithoutTime(trip.backDtDep);
        trip.backTimeDep = backTimeDep;
        trip.backDateArr = customDate.getFormatDateWithoutTime(trip.backDtArr);
        trip.backTimeArr = backTimeArr;
        trip.backDtArrFormated = customDate.getFormatDate(trip.backDtArr);
        trip.backDtDepFormated = customDate.getFormatDate(trip.backDtDep);
      }
      [dateDep, timeDep] = trip.dtDep.split(' ');
      [dateArr, timeArr] = trip.dtArr.split(' ');
      trip.timeArr = timeArr;
      trip.timeDep = timeDep;
      trip.dateArr = customDate.getFormatDateWithoutTime(trip.dtArr);
      trip.dateDep = customDate.getFormatDateWithoutTime(trip.dtDep);
      trip.dtArrFormated = customDate.getFormatDate(trip.dtArr);
      trip.dtDepFormated = customDate.getFormatDate(trip.dtDep);

      if (!this.freePlaces && trip.places !== 0) {
        this.freePlaces = true;
      }
      return trip;
    });

    this.avalibleDates.replace(avalibleDates);
    this.trips.replace(data);
    this.animation = this.show ? this.show : this.animation;
    this.isLoadingTrips = false;
    this.show = '';
  };

  filterTime = (trip) => {
    const cData = {
      depForw: new Date(trip.dtDep).getHours(),
      depBack: new Date(trip.backDtDep).getHours(),
      arrForw: new Date(trip.dtArr).getHours(),
      arrBack: new Date(trip.backDtArr).getHours(),
    };

    return (
      this.filter.departure.forward[0] <= cData.depForw &&
      cData.depForw <= this.filter.departure.forward[1] &&
      this.filter.departure.back[0] <= cData.depBack &&
      cData.depBack <= this.filter.departure.back[1] &&
      this.filter.arrived.forward[0] <= cData.arrForw &&
      cData.arrForw <= this.filter.arrived.forward[1] &&
      this.filter.arrived.back[0] <= cData.arrBack &&
      cData.arrBack <= this.filter.arrived.back[1]
    );
  };

  @computed
  get tripsData() {
    let arr = this.trips;
    const isBack = this.trips.length && this.trips[0].backTripId;

    if (isBack) {
      arr = arr.filter(this.filterTime);
    }

    if (this.sorted.field === 'price' && !this.sorted.type) {
      if (isBack) return arr.sort((a, b) => a.fullPrice - b.fullPrice);
      return arr.sort((a, b) => {
        const aPrice = a.discPrice ? a.discPrice : a.price;
        const bPrice = b.discPrice ? b.discPrice : b.price;

        return aPrice - bPrice;
      });
    } else if (this.sorted.field === 'price' && this.sorted.type) {
      if (isBack) return arr.sort((a, b) => b.fullPrice - a.fullPrice);
      return arr.sort((a, b) => {
        const aPrice = a.discPrice ? a.discPrice : a.price;
        const bPrice = b.discPrice ? b.discPrice : b.price;

        return bPrice - aPrice;
      });
    }

    if (this.sorted.field === 'freeseat' && !this.sorted.type) {
      return arr.sort((a, b) => a.places - b.places);
    } else if (this.sorted.field === 'freeseat' && this.sorted.type) {
      return arr.sort((a, b) => b.places - a.places);
    }

    if (this.sorted.field === 'arrived' && !this.sorted.type) {
      return arr.sort((a, b) => a.dtArrSec - b.dtArrSec);
    } else if (this.sorted.field === 'arrived' && this.sorted.type) {
      return arr.sort((a, b) => b.dtArrSec - a.dtArrSec);
    }

    if (this.sorted.field === 'waytime' && !this.sorted.type) {
      return arr.sort((a, b) => a.wayTimeSec - b.wayTimeSec);
    } else if (this.sorted.field === 'waytime' && this.sorted.type) {
      return arr.sort((a, b) => b.wayTimeSec - a.wayTimeSec);
    }

    if (this.sorted.field === 'departure' && !this.sorted.type) {
      return arr.sort((a, b) => a.dtDepSec - b.dtDepSec);
    } else if (this.sorted.field === 'departure' && this.sorted.type) {
      return arr.sort((a, b) => b.dtDepSec - a.dtDepSec);
    }

    return arr;
  }

  @computed
  get dates() {
    const oneDay = 1000 * 60 * 60 * 24;
    const cDay = this.when;

    return [
      new Date(cDay.getTime() + oneDay * -3),
      new Date(cDay.getTime() + oneDay * -2),
      new Date(cDay.getTime() + oneDay * -1),
      new Date(cDay.getTime()),
      new Date(cDay.getTime() + oneDay * 1),
      new Date(cDay.getTime() + oneDay * 2),
      new Date(cDay.getTime() + oneDay * 3),
    ];
  }

  @action
  /* sort by type */ sortByType = (type) => {
    this.sorted.type = this.sorted.field === type && !this.sorted.type;
    this.sorted.field = type;
  };

  @action
  /* fetch segment trips */ fetchSegmentTrips = (dep, arr, date) => {
    const url = `?from=${dep.id}&to=${arr.id}&when=${date}`;
    this.isLoadingTrips = true;

    Trip.searchWeek(url).then((json) => {
      if (json.success === true) {
        this.setTrips(json.data.currentDayTrips, json.data.dates);
      }
    });
  };
}
