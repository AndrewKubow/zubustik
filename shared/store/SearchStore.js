import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import queryString from 'query-string';
import { action, observable, computed, observe, extendObservable } from 'mobx';
import { customDate } from '../utils/date';
import { Content } from '../utils/api';
import { getCustomState } from '../utils/store';

export default class SearchStore {
  constructor(data = {}) {
    extendObservable(this, data);
  }

  paramURI = '';

  @action
  /* fetch popular from */ fetchPopular = (fromDep, fromArr) => {
    const paramFromDep = `?from=${fromDep}`;
    const paramFromArr = `?from=${fromArr}`;

    Content.popular(paramFromDep).then((json) => {
      if (json.success === true) {
        this.popularFrom.replace(json.data.filter(item => item.type === 'international'));

        Content.popular(paramFromArr).then(this.setPopular);
      }
    });
  };

  @action
  /* set popular */ setPopular = (json) => {
    this.popularTo.replace(json.data.filter(item => item.type === 'international'));
    this.isLoadingPopular = false;
  };

  @computed
  get popularfrom() {
    const popular = this.popularFrom;

    if (popular.length) {
      return (popular[0].rating || [])
        .map((item) => {
          item.minPrice = (item.minPrice || {}).replace(/\.\d+/, '');
          return item;
        })
        .slice();
    }

    return [];
  }

  @computed
  get popularto() {
    const popular = this.popularTo;

    if (popular.length) {
      return (popular[0].rating || [])
        .map((item) => {
          item.minPrice = item.minPrice.replace(/\.\d+/, '');
          return item;
        })
        .slice();
    }

    return [];
  }

  @action
  /* get cities for autocomplete */ fetchCities = () => {
    this.isLoading = true;
    Content.cities().then(this.setCities);
  };

  @action
  /* set cities for autocomplete */ setCities = (json) => {
    if (json.success === true) {
      this.cities.replace(json.data);
      this.setSearchParams();
      this.isLoading = false;
    }
  };

  @action
  /* set current data */ setSearchParams = (history, match) => {
    if (history && (history.location || {}).search) {
      this.paramURI = history.location.search;
      this.type = 'history';
    } else {
      this.paramURI = '';
    }

    if ((match || {}).from) {
      this.segment = match;
      this.type = 'segment';
    } else {
      this.segment = this.type === 'segment' ? this.segment : null;
    }

    if (!this.cities.length) {
      this.fetchCities();
      return true;
    }

    if (this.paramURI && this.segment === null) {
      const parse = queryString.parse(this.paramURI);
      this.departure = this.cities.filter(item => item.id === +parse.from)[0];
      this.arrived = this.cities.filter(item => item.id === +parse.to)[0];
      this.cityTitle = {
        departure: this.departure.name,
        arrived: this.arrived.name,
      };
      this.date = parse.when;
      this.backdate = parse.whenback ? parse.whenback : '';
      this.bothSide = !!parse.goback;
      this.directPath = !parse.change;
    }

    if (this.segment) {
      const { from, to } = this.segment;
      const store = getCustomState();

      this.departure = this.cities.filter(
        item => item.nameEn.toLowerCase() === String(from).toLowerCase(),
      )[0];
      this.arrived = this.cities.filter(
        item => item.nameEn.toLowerCase() === String(to).toLowerCase(),
      )[0];
      this.directPath = true;
      this.bothSide = false;
      this.date = customDate.getTomorrow(new Date());
      this.cityTitle = {
        departure: this.departure.name,
        arrived: this.arrived.name,
      };

      store.results.parse = {
        from: this.departure.id,
        to: this.arrived.id,
      };
      store.results.fetchSegmentTrips(
        this.departure,
        this.arrived,
        customDate.getDateParse(this.date),
      );
      this.fetchPopular(this.departure.id, this.arrived.id);
    }
  };

  @computed
  get citiesData() {
    return this.cities.map((item) => {
      item.value = (
        <MenuItem value={item.id}>
          <span>{item.name}</span>,<span className="search__country"> {item.country}</span>
        </MenuItem>
      );
      item.text = item.name;
      return item;
    });
  }

  @action
  /* set route */ setRoute = (route) => {
    this[route.direction] = route.data;
  };

  @action
  /* set date */ setDate = (date) => {
    if (date.datepiker === 'date' && this.bothSide) this.backdate = '';
    this[date.datepiker] = date.date;
  };

  @action
  /* set aditional params */ setAditionalParam = (id, status) => {
    if (id === 'bothSide' && !this.directPath && status) {
      this.directPath = !this.directPath;
    }

    if (id === 'directPath' && this.bothSide && !status) {
      this.bothSide = !this.bothSide;
    }

    this[id] = status;
  };

  @action
  /* set both side */ toggleDestination = () => {
    const { id, name } = this.arrived;
    this.arrived = this.departure;
    this.departure = { id, name };
  };

  @action
  /* Submiting form */ submit = (history) => {
    let url = `?from=${this.departure.id}&to=${this.arrived.id}&when=${customDate.getDateParse(
      new Date(this.date),
    )}`;
    if (!this.directPath) {
      url += '&change=1';
    }

    if (this.bothSide && this.backdate) {
      url += `&goback=1&whenback=${customDate.getDateParse(new Date(this.backdate))}`;
    }
    history.push(`/search${url}`);
  };
}
