import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import cookie from 'react-cookie';

import dvrExtend from '../dvr';
import { Authentication, Profile } from '../../utils/api';
import { getCustomState } from '../../utils/store';
import { fields } from '../../forms/setup/reset';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const responseBody = (r, form, values) => {
  form.isLoading = false;
  form.status = r.status;
  const store = getCustomState();

  if (r.status === 401) {
    const param = {
      device_id: localStorage.getItem('device_id'),
      refresh_token: cookie.load('refresh_token'),
      access_token: cookie.load('access_token'),
    };

    Authentication.refresh(param).then((res) => {
      if (res.success === true) {
        cookie.save('access_token', res.data.access_token, { path: '/' });
        values.access_token = res.data.access_token;
        form.isLoading = true;
        Profile['change-password'](values).then(json => responseBody(json, form, ''));
      } else {
        location.replace('/');
      }
    });
    return true;
  }

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
  store.common.setAccountSettings({
    editable: false,
    changePass: false,
  });

  store.common.setSneckbar({
    open: true,
    msg: 'Ваш пароль обновлен.',
    action: '',
  });
  form.reset();
};

const hooks = {
  onSuccess(form) {
    const values = form.values();
    values.access_token = cookie.load('access_token');

    form.isLoading = true;
    Profile['change-password'](values).then(json => responseBody(json, form, values));
  },
  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Заполните пожалуйста форму корректно.');
  },
};

const formR = new MobxReactForm({ fields }, { plugins, hooks });
export default formR;
