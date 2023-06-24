export const fields = {
  email: {
    label: 'E-mail',
    placeholder: 'E-MAIL',
    rules: 'email|string|between:2,50',
  },
  phone: {
    label: 'Номер телефона',
    placeholder: 'НОМЕР ТЕЛЕФОНА',
    rules: 'string|telephone',
  },
  name: {
    label: 'Имя',
    placeholder: 'ИМЯ',
    rules: 'string|between:2,25',
  },
  surname: {
    label: 'Фамилия',
    placeholder: 'ФАМИЛИЯ',
    rules: 'string|between:2,25',
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
