import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import cookie from 'react-cookie';

import dvrExtend from '../dvr';
import { Authentication } from '../../utils/api';
import { getCustomState } from '../../utils/store';
import { fields } from '../../forms/setup/signin';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const responseBody = (r, form) => {
  form.isLoading = false;
  form.status = r.status;
  const store = getCustomState();

  if (r.status !== 200) {
    let error = '';

    if (r.data && r.data.message) {
      error = r.data.message;
    } else {
      const first = Object.keys(r.data)[0];
      error = r.data[first].length ? r.data[first][0] : 'Некорректная форма.';
    }

    store.common.setSneckbar({
      open: true,
      msg: error,
      action: '',
    });
    return false;
  }

  cookie.save('access_token', r.data.access_token, { path: '/', maxAge: 43200 }); // 12 hours
  cookie.save('refresh_token', r.data.refresh_token, { path: '/' });

  store.auth.setAccessToken(r.data.access_token);
  store.auth.setRefreshToken(r.data.refresh_token);
  store.auth.getUser();
  store.navigation.setStatus(false);
  store.common.setSneckbar({
    open: true,
    msg: 'Вы успешно авторизированы.',
    action: 'В кабинет',
  });
  form.reset();
};

const hooks = {
  onSuccess(form) {
    const values = form.values();
    values.device_id = localStorage.getItem('device_id');

    form.isLoading = true;
    Authentication.signin(values).then(json => responseBody(json, form));
  },
  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Заполните пожалуйста форму корректно.');
  },
};

const form = new MobxReactForm({ fields }, { plugins, hooks });
export default form;
