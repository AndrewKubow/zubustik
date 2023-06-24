import { action, observable } from 'mobx';

export default class NavigationStore {
  @observable show = false;
  @observable menu = ['support', 'signin', 'signup', 'mobilemenu'];
  @observable currentMenu = '';

  @action
  setAdwMenu(show, menu) {
    this.show = show;
    this.currentMenu = menu;
  }

  @action
  setStatus(show) {
    this.show = show;
  }

  @action
  setMenu(menu) {
    this.currentMenu = menu;
  }

  @action
  showAdwMenu(data) {
    if (!data.menu && !data.show) {
      this.setStatus(false);
      return true;
    }
    if (!this.show) {
      this.setAdwMenu(true, data.menu);
      return true;
    }
    if (this.currentMenu === data.menu) {
      this.setStatus(false);
      return true;
    }
    if (this.currentMenu !== data.menu) {
      this.setMenu(data.menu);
      return true;
    }

    return false;
  }
}
