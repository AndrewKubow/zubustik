import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import cookie from 'react-cookie';

import dvrExtend from '../dvr';
import { Authentication, Profile } from '../../utils/api';
import { getCustomState } from '../../utils/store';
import { fields } from '../../forms/setup/account';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const getChangeData = (form) => {
  const values = {};

  values.access_token = cookie.load('access_token');
  Object.keys(form.values()).forEach((item) => {
    if (form.fields._data[item].value.changed) {
      values[item] = form.fields._data[item].value.value;
    }
  });

  if (values.email) values.login = values.email;
  return values;
};

const responseBody = (r, form) => {
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
        Profile.edit(values).then(json => responseBody(json, form, ''));
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
  store.auth.getUser();
  store.common.setAccountSettings({
    editable: false,
    changePass: false,
  });

  store.common.setSneckbar({
    open: true,
    msg: 'Ваши данные обновлены.',
    action: '',
  });
};

const hooks = {
  onSuccess(form) {
    const values = getChangeData(form);

    form.isLoading = true;
    Profile.edit(values).then(json => responseBody(json, form, values));
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
