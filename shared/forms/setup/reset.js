import { shouldBeEqualTo } from '../../forms/dvr';

export const fields = {
  password: {
    label: 'Пароль',
    placeholder: 'ПАРОЛЬ',
    related: ['confirm_password'],
    rules: 'required|string|min:6',
  },
  confirm_password: {
    label: 'Пароль',
    placeholder: 'ПОВТОРИТЕ ПАРОЛЬ',
    validators: shouldBeEqualTo('password'),
    rules: 'required|string|min:6',
  },
};
