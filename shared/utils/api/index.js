import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import config from '../../../config';

promise.polyfill();

const API_ROOT = config('api');
const responseBodyToJson = res => res.json();
const requests = {
  get: (url, param, auth) => {
    const headers = {};

    if (auth && param.access_token) {
      headers.Authorization = `Bearer ${param.access_token}`;
    }
    return fetch(`${API_ROOT}${url}`, { method: 'GET', headers }).then(responseBodyToJson);
  },
  post: (url, param, auth) => {
    const headers = { 'Content-Type': 'application/json' };

    if (auth && param.access_token) {
      headers.Authorization = `Bearer ${param.access_token}`;
    }
    return fetch(`${API_ROOT}${url}`, {
      method: 'POST',
      body: JSON.stringify(param),
      headers,
    }).then(responseBodyToJson);
  },
  put: (url, param, auth) => {
    const headers = { 'Content-Type': 'application/json' };

    if (auth && param.access_token) {
      headers.Authorization = `Bearer ${param.access_token}`;
    }
    return fetch(`${API_ROOT}${url}`, {
      method: 'PUT',
      body: JSON.stringify(param),
      headers,
    }).then(responseBodyToJson);
  },
  getlocal: (url) => {
    const headers = {};
    return fetch(url, { method: 'GET', headers }).then(responseBodyToJson);
  }
};

export const Content = {
  cities: () => requests.get('/content/cities'),
  'route-country': () => requests.get('/content/route-country'),
  'route-city': id => requests.get(`/content/route-city/${id}`),
  schedule: id => requests.get(`/content/schedule/${id}`),
  popular: param => requests.get(`/content/popular${param}`),
  getUrl: points => Object.keys(points).map(item => `${API_ROOT}/content/schedule/${item}`),
  countries: () => requests.get('/content/countries'),
  doctypes: () => requests.get('/content/doctypes'),
  promo: param => requests.post('/content/promo', param, true),
};
export const Trip = {
  search: param => requests.get(`/trip/search${param}&edges=0`),
  searchWeek: param => requests.get(`/trip/search${param}&edges=3`),
  trip: param => requests.get(`/trip/info/${param.id}`, param, true),
  route: param => requests.get(`/trip/route/${param.id}`, param, true),
  'detail-info': param => requests.get(`/trip/detail-info${param}`),
  discounts: param => requests.get(`/trip/discounts${param}`),
  'discounts-vip': param => requests.get(`/trip/discounts-vip${param}`),
  'discounts-vip-trip': param => requests.get(`/trip/discounts-vip-trip${param}`),
  ceo: param => requests.get(`/trip/ceo${param}`),
  sale: () => requests.getlocal(`${location.origin}/api/sale`),
};
export const Authentication = {
  signup: param => requests.post('/auth/signup', param),
  signin: param => requests.post('/auth/signin', param),
  refresh: param => requests.post('/auth/refresh', param, true),
  signout: param => requests.post('/auth/signout', param, true),
  forgot: param => requests.put('/auth/forgot-pass', param),
};

export const Profile = {
  list: param => requests.get('/profile/list', param, true),
  tickets: param => requests.get('/profile/tickets', param, true),
  edit: param => requests.put('/profile/edit', param, true),
  'change-password': param => requests.put('/profile/change-password', param, true),
  export: param => requests.get(`/profile/export?${param.type}=${param[param.type]}`, param, true),
};

export const Order = {
  buy: params => requests.post('/order/buy', params, true),
  'is-copy': params => requests.post('/order/is-copy', params, true),
  'set-refund': params => requests.post('/order/set-refund', params, true),
  'doc-refund': params => requests.get(`/order/doc-refund?reqId=${params.reqId}`, params, true),
};
