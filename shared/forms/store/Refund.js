import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import dvrExtend from '../dvr';
import { getCustomState } from '../../utils/store';
import { Order } from '../../utils/api';
import { fieldsOnCard, fieldsOnAccount } from '../../forms/setup/refund';

const plugins = {
  dvr: {
    package: validatorjs,
    extend: dvrExtend,
  },
};

const responseBody = (r, form) => {};

const hooks = {
  onSuccess(form) {
    const values = form.values();
    const store = getCustomState();
    const params = {
      access_token: store.auth.access_token,
      data: {
        reason: store.auth.refund.reason,
        method: store.auth.refund.paymentMethod,
        tickets: store.auth.refundData.slice(),
      },
    };

    if (store.auth.refund.reason === 2) {
      params.data.other = store.auth.otherReason || 'другая причина';
    }

    if (store.auth.refund.paymentMethod !== '0') {
      params.data = { ...params.data, ...values };
    }

    Order['set-refund'](params).then((json) => {
      if (json.success === true) {
        store.auth.refundState = false;
        store.auth.getTickets();

        store.common.setSneckbar({
          open: true,
          msg: 'Ваша заявка успешно зарегестрирована.',
          action: '',
        });
      } else {
        store.common.setSneckbar({
          open: true,
          msg: 'Что-то пошло не так, повторите попытку позже.',
          action: '',
        });
      }
    });
  },
  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Заполните пожалуйста форму корректно.');
  },
};

export const formOnCard = new MobxReactForm({ fields: fieldsOnCard }, { plugins, hooks });
export const formOnAccount = new MobxReactForm({ fields: fieldsOnAccount }, { plugins, hooks });
