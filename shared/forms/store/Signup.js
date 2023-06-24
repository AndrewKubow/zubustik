import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import dvrExtend from '../dvr';
import { Authentication } from '../../utils/api';
import { getCustomState } from '../../utils/store';
import { fields } from '../../forms/setup/signup';

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
      const msg =
        first === 'login' || first === 'email'
          ? 'Данный e-mail уже зарегестрирован.'
          : 'Данный телефоный номер уже зарегестрирован.';

      error = r.data[first].length ? msg : 'Некорректная форма.';
    }

    store.common.setSneckbar({
      open: true,
      msg: error,
      action: '',
    });
    return false;
  }

  store.navigation.setStatus(false);
  store.common.setSneckbar({
    open: true,
    msg: 'Вы успешно зарегестрированы.',
    action: 'Авторизоватся',
  });
  form.reset();
};

const hooks = {
  onSuccess(form) {
    const values = form.values();

    values.device_id = localStorage.getItem('device_id');
    values.login = values.email;

    form.isLoading = true;
    Authentication.signup(values).then(json => responseBody(json, form));
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
