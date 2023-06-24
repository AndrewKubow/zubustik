import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

promise.polyfill();

export const getToken = () => {
  const key = 'fbed593fa15ffc40edf87e2435abca014a73a50f177d581b'
  return fetch(`https://octobus.cloud/cgi-bin/gtmapp/wapi/login?public=${key}`).then(res => res.json());
}

export const getSale = (token) => {
  const headers = {
    Session: token,
  };

  return fetch(`https://octobus.cloud/cgi-bin/gtmapp/wapi/actionoffers?lang=ru`, { method: 'GET', headers }).then(res => res.json());
}