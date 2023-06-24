export const fields = {
  email: {
    label: 'E-mail',
    placeholder: 'E-MAIL',
    rules: 'required|email|string|between:2,50',
  },
  phone: {
    class: 'phone',
    label: 'Номер телефона',
    placeholder: '____________',
    rules: 'required|string|telephone',
    value: '38',
  },
  promo: {
    label: 'Промо',
    placeholder: 'ПРОМОКОД',
    rules: 'string|between:2,25',
  },
  terms: {
    type: 'checkbox',
    label:
      'Я принимаю условия возврата, публичной оферты и даю согласие на обработку персональных данных',
    placeholder: 'terms',
    rules: 'accepted|boolean',
  },
};
