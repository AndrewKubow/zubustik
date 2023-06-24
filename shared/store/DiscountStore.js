import { action, observable, computed, extendObservable } from 'mobx';
import React from 'react';
import isObject from 'lodash/isObject';
import MenuItem from 'material-ui/MenuItem';

import { getCustomState } from '../utils/store';
import { Trip } from '../utils/api';
import { customDate } from '../utils/date';

export default class DiscountStore {
  constructor(data = {}) {
    extendObservable(this, data);
  }

  @action
  /* set date */ setDetailsTripDate = (date) => this.detailsTripDate = date

  @action
  /* get trip Id */ fetchTripId = (date, rawTripId, history) => {
    const fDate = customDate.getDateParse(new Date(date));
    const params = `?trip_id=${rawTripId}&date=${fDate}`;

    Trip['discounts-vip-trip'](params).then((json) => {
      if (json.success === true) {
        this.redirectByTripId(json.data, history);
      }
    });
  };

  @action
  /* redirect by trip id */ redirectByTripId = ({ tripId }, history) => {
    history.push(`/checkout/${tripId}`);
  };

  @action
  /* get details */ fetchDetails = (id) => {
    this.isLoadingDetails = true;
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
  /* sort by type */ sortByType = (type) => {
    this.sorted.type = this.sorted.field === type && !this.sorted.type;
    this.sorted.field = type;
  };

  @action
  /* set details */ setDetails = (data, id) => {
    this.details[id] = data;
    this.isLoadingDetails = false;
  };

  @action
  /* set tripId for details */ setTripId = (id, direction) => {
    this.tripId = id;
    this.direction = direction;
    if (id === '' || this.details[id]) return false;
    this.fetchDetails(id);
  };

  @action
  /* get details trip */ fetchDetailsTrip = (id) => {
    this.isLoadingDisc = true;
    const store = getCustomState();
    const param = {
      id,
      access_token: store.auth.access_token,
    };

    Trip.route(param).then(json => this.setDetailsTrip(json));
  };

  @action
  /* set details trip */ setDetailsTrip(json) {
    if (json.success === true) {
      this.detailsTrip = json.data;
    }
    this.isLoadingDisc = false;
  }

  @action
  /* set all discounts */ setAllDisc(json) {
    if (json.success === true && !json.data.error) {
      const dep = [];
      const arr = [];

      this.allDisc.replace(
        json.data.map((trip) => {
          const isDep = dep.filter(item => item.id === trip.cityFrom).length;
          const isArr = arr.filter(item => item.id === trip.cityTo).length;

          trip.dtDepFormated = trip.depTime;
          trip.dtArrFormated = trip.arrTime;
          trip.stDepName = trip.cityFromName;
          trip.stDepAddr = trip.stFromAddr;
          trip.stArrName = trip.cityToName;
          trip.stArrAddr = trip.stToAddr;
          trip.discPerc = trip.maxPercent;

          if (!isDep) {
            dep.push({
              id: trip.cityFrom,
              value: (
                <MenuItem
                  value={trip.cityFrom}
                  key={`${trip.cityFrom}-dep-${new Date().getTime()}`}
                >
                  <span>{trip.cityFromName}</span>,<span className="discount__country">
                    {trip.cnFromName}
                  </span>
                </MenuItem>
              ),
              text: trip.cityFromName,
            });
          }
          if (!isArr) {
            arr.push({
              id: trip.cityTo,
              value: (
                <MenuItem value={trip.cityTo} key={`${trip.cityTo}-arr-${new Date().getTime()}`}>
                  <span>{trip.cityToName}</span>,<span className="discount__country">
                    {trip.cnToName}
                  </span>
                </MenuItem>
              ),
              text: trip.cityToName,
            });
          }

          return trip;
        }),
      );

      this.citiesDep.replace(dep);
      this.citiesArr.replace(arr);
    } else {
      
    }

    this.isLoadingDisc = false;
  }

  @action
  /* get all discounts */ fetchAllDisc = () => {
    this.isLoadingDisc = true;
    Trip['discounts-vip']('?vip=0').then(json => this.setAllDisc(json));
  };

  @action
  /* get all discounts */ fetchAllSale = () => {
    this.isLoadingSale = true;
    Trip.sale().then(json => {
      const data = {
        data: json,
        success: true,
      };
      this.setAllDisc(data);
    });
  };

  @action
  /* get vip discounts */ fetchVipDisc = () => {
    this.isLoadingDiscVip = true;
    Trip['discounts-vip']('?vip=1').then(json => this.setVipDisc(json));
  };

  @action
  /* set vip discounts */ setVipDisc(json) {
    if (json.success === true) {
      this.vipDisc.replace(json.data);
    }
    this.isLoadingDiscVip = false;
  }

  @computed
  get vipDiscWithFixPrice() {
    return this.vipDisc.map((item) => {
      item.minPrice = String(item.minPrice).replace(/\.\d+/, '');
      return item;
    });
  }

  @action
  /* submit filted */ clearFilter = () => {
    this.filter.departure = '';
    this.filter.arrived = '';
  };

  @action
  /* set filter */ setFilter = (direction, id) => {
    this.filter[direction] = id;
  };

  @action
  /* set lazyitem */ setLazyitem = () => {
    this.lazyitem += 20;
  }

  @computed
  get filteredSale() {
    const temp = [];

    let filteredList = this.allDisc.filter((item) => {
      const dep = item.cityFrom;
      const arr = item.cityTo;
      const isCompare = {
        departure: null,
        arrived: null,
      };

      if (this.filter.departure) {
        isCompare.departure = dep === this.filter.departure;
      }

      if (this.filter.arrived) {
        isCompare.arrived = arr === this.filter.arrived;
      }

      return (
        (isCompare.departure && isCompare.arrived) ||
        (isCompare.departure && isCompare.arrived === null) ||
        (isCompare.departure === null && isCompare.arrived)
      );
    });

    if (!filteredList.length && this.filter.arrived === '' && this.filter.departure === '') {
      filteredList = this.allDisc;
    }

    if (!filteredList.length) return filteredList;

    for (let i = 0; i < this.lazyitem + 20; i += 1) {
      const trip = filteredList.length > i ? filteredList[i] : false;

      if (isObject(trip)) {
        temp.push(trip);
      }
    }

    return temp;
  }

  @computed
  get filteredDisconuts() {
    let filteredList = this.allDisc.filter((item) => {
      const dep = item.cityFrom;
      const arr = item.cityTo;
      const isCompare = {
        departure: null,
        arrived: null,
      };

      if (this.filter.departure) {
        isCompare.departure = dep === this.filter.departure;
      }

      if (this.filter.arrived) {
        isCompare.arrived = arr === this.filter.arrived;
      }

      return (
        (isCompare.departure && isCompare.arrived) ||
        (isCompare.departure && isCompare.arrived === null) ||
        (isCompare.departure === null && isCompare.arrived)
      );
    });

    if (!filteredList.length && this.filter.arrived === '' && this.filter.departure === '') {
      filteredList = this.allDisc;
    }

    if (this.sorted.field === 'price' && !this.sorted.type) {
      return filteredList.sort((a, b) => a.minPrice - b.minPrice);
    } else if (this.sorted.field === 'price' && this.sorted.type) {
      return filteredList.sort((a, b) => b.minPrice - a.minPrice);
    }

    if (this.sorted.field === 'arrived' && !this.sorted.type) {
      return filteredList.sort((a, b) => a.arrTimeSec - b.arrTimeSec);
    } else if (this.sorted.field === 'arrived' && this.sorted.type) {
      return filteredList.sort((a, b) => b.arrTimeSec - a.arrTimeSec);
    }

    if (this.sorted.field === 'waytime' && !this.sorted.type) {
      return filteredList.sort((a, b) => a.wayTimeSec - b.wayTimeSec);
    } else if (this.sorted.field === 'waytime' && this.sorted.type) {
      return filteredList.sort((a, b) => b.wayTimeSec - a.wayTimeSec);
    }

    if (this.sorted.field === 'departure' && !this.sorted.type) {
      return filteredList.sort((a, b) => a.depTimeSec - b.depTimeSec);
    } else if (this.sorted.field === 'departure' && this.sorted.type) {
      return filteredList.sort((a, b) => b.depTimeSec - a.depTimeSec);
    }

    return filteredList;
  }
}
