import { action, observable, computed } from 'mobx';
import { Content } from '../utils/api';
import { customDate } from '../utils/date';

export default class ScheduleStore {
  @observable data = [];
  @observable isLoading = true;
  @observable country = 'UA';

  @observable points = {};
  @observable selectedCity = '';
  @observable markers = [];
  @observable center = { lat: -34.397, lng: 150.644 };
  @observable filteredList = [];
  @observable list = {};
  @observable
  filter = {
    field: 'price',
    type: false,
    point: null,
  };

  fetchCountry(city = false) {
    this.isLoading = true;
    Content['route-country']().then(json => this.setSchedule(json, city));
  }

  @action
  setSchedule(json, city) {
    if (json.success === true) {
      this.data = json.data;
    }
    if (!city) {
      this.isLoading = false;
    }
  }

  @action
  setSelected(category, selected) {
    if (category === 'country') {
      this.country = selected;
    }
  }

  @action getPoints = id => this.fetchCity(id);
  @action getSchedule = city => this.fetchCountry(city);

  @action
  /* sort by type */ sortByType(type) {
    this.filter.type = !!(this.filter.field === type && !this.filter.type);
    this.filter.field = type;
  }

  @action
  /* sort by point */ sortByPoint(point) {
    this.filter.point = point;
    const data = this.list[point].error
      ? this.filteredList.replace([{ error: true }])
      : this.filteredList.replace(this.list[point]);
  }

  @action
  /* govnocode */ setAllRoutes() {
    let arr = [];
    Object.keys(this.list).map((item) => {
      arr = arr.concat(Array.isArray(this.list[item]) ? this.list[item] : []);
    });

    this.filteredList.replace(arr);
  }

  @computed
  get schedules() {
    return this.data.slice();
  }

  @computed
  get dataRoutes() {
    const arr = this.filteredList;

    if (this.filter.field === 'price' && !this.filter.type) {
      return arr.sort((a, b) => a.route[a.route.length - 1].price - b.route[b.route.length - 1].price);
    } else if (this.filter.field === 'price' && this.filter.type) {
      return arr.sort((a, b) => b.route[b.route.length - 1].price - a.route[a.route.length - 1].price);
    }

    if (this.filter.field === 'departure' && !this.filter.type) {
      return arr.sort((a, b) => {
        if (a.route[0].timeDep > b.route[0].timeDep) {
          return 1;
        }
        if (a.route[0].timeDep < b.route[0].timeDep) {
          return -1;
        }
        return 0;
      });
    } else if (this.filter.field === 'departure' && this.filter.type) {
      return arr.sort((a, b) => {
        if (a.route[0].timeDep < b.route[0].timeDep) {
          return 1;
        }
        if (a.route[0].timeDep > b.route[0].timeDep) {
          return -1;
        }
        return 0;
      });
    }

    if (this.filter.field === 'arrived' && !this.filter.type) {
      return arr.sort((a, b) => {
        if (a.route[a.route.length - 1].timeArr > b.route[b.route.length - 1].timeArr) {
          return 1;
        }
        if (a.route[a.route.length - 1].timeArr < b.route[b.route.length - 1].timeArr) {
          return -1;
        }
        return 0;
      });
    } else if (this.filter.field === 'arrived' && this.filter.type) {
      return arr.sort((a, b) => {
        if (a.route[a.route.length - 1].timeArr < b.route[b.route.length - 1].timeArr) {
          return 1;
        }
        if (a.route[a.route.length - 1].timeArr > b.route[b.route.length - 1].timeArr) {
          return -1;
        }
        return 0;
      });
    }

    return arr;
  }

  @computed
  get getFilteredCities() {
    const filteredCities = {};
    const currCities = this.data.filter(item => item.idCn === this.country)[0] || { cities: [] };

    currCities.cities.forEach((item) => {
      const fLatter = item.nameCity.charAt(0);
      if (!filteredCities[fLatter]) {
        filteredCities[fLatter] = [];
      }

      filteredCities[fLatter].push(item);
    });

    return filteredCities;
  }

  @computed
  get getCities() {
    return this.data.filter(item => item.idCn === this.country);
  }

  @action
  setCityId(id) {
    this.selectedCity = id;
  }

  @computed
  get getCityName() {
    if (this.getCities[0] && this.getCities[0].cities.length) {
      const currentCityName = this.getCities[0].cities.filter(
        item => +item.idCity === +this.selectedCity,
      );
      return currentCityName[0] ? currentCityName[0].nameCity : '';
    }
    return '';
  }

  @action
  /* get data by id city */ fetchCity = (id) => {
    this.isLoading = true;
    Content['route-city'](id).then(json => this.setPoints(json));
  };

  @action
  /* search */ searchByParam = (dep, arr, data, history) => {
    const url = `?from=${dep}&to=${arr}&when=${customDate.getDateParse(data)}&change=1`;

    history.push(`/search${url}`);
  };

  @action
  /* get data by id city */ setPoints = (json) => {
    this.points = {};
    if (json.success === true) {
      json.data.forEach(item => (this.points[item.stCode] = item));
      this.markers.replace(
        json.data.map(item => ({
          lat: item.lat,
          lng: item.long,
        })),
      );
      const { lat, long } = json.data[0];
      if (lat && long) {
        this.center = {
          lat,
          lng: long,
        };
      }
    }

    this.fetchList();
  };

  @action
  /* get data by id point */ fetchList = () => {
    this.list = {};

    const getContent = url =>
      fetch(url)
        .then(resp => resp.json())
        .then((json) => {
          if (json.success === true) {
            const point = url.split('/').pop();
            this.list[point] = json.data;
          }
        });

    Promise.all(Content.getUrl(this.points).map(getContent)).then(() => {
      this.isLoading = false;
      this.setAllRoutes();
    });
  };
}
