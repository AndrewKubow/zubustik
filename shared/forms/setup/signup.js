import { shouldBeEqualTo } from '../../forms/dvr';

export const fields = {
  email: {
    label: 'E-mail',
    placeholder: 'E-MAIL',
    rules: 'required|email|string|between:2,50',
  },
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
  phone: {
    class: 'phone',
    label: 'Номер телефона',
    placeholder: '____________',
    rules: 'required|string|telephone',
    value: '38',
  },
  name: {
    label: 'Имя',
    placeholder: 'ИМЯ',
    rules: 'required|string|between:2,25',
  },
  surname: {
    label: 'Фамилия',
    placeholder: 'ФАМИЛИЯ',
    rules: 'required|string|between:2,25',
  },
  viber: {
    type: 'checkbox',
    label: 'Viber',
    placeholder: 'Viber',
    rules: 'boolean',
  },
  telegram: {
    type: 'checkbox',
    label: 'Telegram',
    placeholder: 'Telegram',
    rules: 'boolean',
  },
  watsapp: {
    type: 'checkbox',
    label: 'WhatsApp',
    placeholder: 'WhatsApp',
    rules: 'boolean',
  },
};
