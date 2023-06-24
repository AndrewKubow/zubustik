import { action, observable, computed } from 'mobx';
import { Content } from '../utils/api';

export default class HomeStore {
  @observable popular = [];
  @observable isLoading = true;

  @action /* get popular data */ fetchPopular = () => {
    this.isLoading = true;
    Content.popular('')
      .then(json => this.setPopular(json));
  }

  @action /* set popular */ setPopular(json) {
    if (json && json.success === true) {
      this.popular.replace(json.data.filter(item => (item.type === 'international')));
    }
    this.isLoading = false;
  }

  @computed get getPopular() {
    const popular = this.popular;

    if (popular.length) {
      return popular[0].rating.map((item) => {
        item.minPrice = item.minPrice.replace(/\.\d+/, '');
        return item;
      }).slice();
    }

    return [];
  }

  @action /* set new route */ setPopularRoute(history, link) {
    history.push(`/line${link}`);
  }
}
