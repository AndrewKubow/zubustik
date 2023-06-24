import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import dvrExtend from '../dvr';
import { Authentication } from '../../utils/api';
import { fields } from '../../forms/setup/forgot';

const responseBody = (r, form) => {
  form.isLoading = false;
  form.status = r.status;
  if (r.status !== 200) {
    let error = '';

    if (r.data && r.data.message) {
      error = r.data.message;
    } else {
      const first = Object.keys(r.data)[0];
      error = r.data[first].length ? r.data[first][0] : 'Некорректная форма.';
    }

    form.msg = error;
    return form.invalidate(error);
  }
  form.msg = 'Ссылка на восстановление пароля будет отправлена на ваш адрес электронной почты.';
  return form.invalidate('OK');
};

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const hooks = {
  onSuccess(form) {
    const values = form.values();

    form.isLoading = true;
    Authentication.forgot(values).then(json => responseBody(json, form));
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
