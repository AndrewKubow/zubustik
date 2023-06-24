import { extendObservable } from 'mobx';

import AuthStore from './AuthStore';
import ScheduleStore from './ScheduleStore';
import CommonStore from './CommonStore';
import NavigationStore from './NavigationStore';
import HomeStore from './HomeStore';
import SearchStore from './SearchStore';
import ResultsStore from './ResultsStore';
import DiscountStore from './DiscountStore';
import CheckoutStore from './CheckoutStore';
import DownloadStore from './DownloadStore';

export default class Store {
  constructor(data = {}) {
    const {
      counter,
      schedule,
      common,
      navigation,
      homeRoute,
      search,
      results,
      auth,
      discount,
      checkout,
      download,
      ...rest
    } = data;
    this.auth = new AuthStore(auth);
    this.download = new DownloadStore(download);
    this.schedule = new ScheduleStore(schedule);
    this.search = new SearchStore(search);
    this.common = new CommonStore(common);
    this.navigation = new NavigationStore(navigation);
    this.homeRoute = new HomeStore(homeRoute);
    this.discount = new DiscountStore(discount);
    this.results = new ResultsStore(results);
    this.checkout = new CheckoutStore(checkout);
    extendObservable(this, rest);
  }
}
