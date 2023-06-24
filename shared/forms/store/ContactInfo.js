import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import dvrExtend from '../dvr';
import { fields } from '../../forms/setup/contactInfo';
import { getCustomState } from '../../utils/store';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const hooks = {
  onSuccess(form) {
    const values = form.values();
    const store = getCustomState();

    console.log('trueee')

    store.checkout.onSuccess(values, store.auth.access_token);
  },
  onError(form) {
    const error = form.errors();
    const store = getCustomState();

    store.common.setSneckbar({
      open: true,
      msg: 'Заполните пожалуйста форму корректно.',
      action: '',
    });

    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    // form.invalidate('Заполните пожалуйста форму корректно.');
  },
};

const form = new MobxReactForm({ fields }, { plugins, hooks });
export default form;
