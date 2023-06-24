import cookie from 'react-cookie';
import { action, extendObservable } from 'mobx';

const shouldRefreshLang = (current, locale) => {
  if (current !== locale) {
    return true;
  }
  return false;
};

const getCurrentUrl = pathname =>
  pathname
    .split('/')
    .filter((part) => {
      if (!part) return false;
      if (part.indexOf('ru') !== -1 || part.indexOf('ua') !== -1) return false;
      return part;
    })
    .join('/');

export default class CommonStore {
  constructor(data = {}) {
    extendObservable(this, data);
  }

  @action /* set account control settings */ setAccountSettings(data) {
    this.account = { ...this.account, ...data };
  }

  @action /* set snackbar */ setSneckbar(data) {
    this.snackbar = { ...this.snackbar, ...data };
  }

  @action /* set snackbar default value */ resetSneckbar() {
    this.setSneckbar({
      open: false,
      msg: '',
      action: '',
    });
  }

  @action /* set currency */ setCurrency(value) {
    cookie.save('currency', value, { path: '/' });
    this.current = value;
  }

  @action /* set lang */ refreshLangIfNeeded(locale) {
    if (shouldRefreshLang(this.locale, locale)) {
      const url = getCurrentUrl(location.pathname);
      location.replace(`/${locale}/${url}`);
    }
    return false;
  }

  @action /* check iscookie true */ checkIsCookie() {
    this.iscookie = Boolean(localStorage.getItem('iscookie')) || false;
  }

  @action /* set iscookie true */ setIsCookie() {
    localStorage.setItem('iscookie', true);
    this.checkIsCookie();
  }
}
