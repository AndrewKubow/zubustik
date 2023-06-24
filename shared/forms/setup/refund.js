export const fieldsOnCard = {
  recipient: {
    label: 'Получатель (фамилия, имя, отчество)',
    placeholder: 'ПОЛУЧАТЕЛЬ (фамилия, имя, отчество)',
    rules: 'required|string|between:2,50',
  },
  cardnum: {
    label: 'Номер карты',
    placeholder: 'НОМЕР КАРТЫ',
    rules: 'required|digits:16',
  },
};

export const fieldsOnAccount = {
  recipient: {
    label: 'Получатель (фамилия, имя, отчество)',
    placeholder: 'ПОЛУЧАТЕЛЬ (фамилия, имя, отчество)',
    rules: 'required|string|between:2,50',
  },
  inn: {
    label: 'ИНН',
    placeholder: 'ИНН',
    rules: 'required|string|between:6,16',
  },
  purpose: {
    label: 'Назначение платежа',
    placeholder: 'НАЗНАЧЕНИЕ ПЛАТЕЖА',
    rules: 'required|string|between:2,165',
  },
  bankmfo: {
    label: 'МФО банка',
    placeholder: 'МФО БАНКА',
    rules: 'required|digits:6',
  },
  bankname: {
    label: 'Наименование банка',
    placeholder: 'НАИМЕНОВАНИЕ БАНКА',
    rules: 'required|string|between:3,50',
  },
  bankaccount: {
    label: 'Номер счета',
    placeholder: 'НОМЕР СЧЕТА',
    rules: 'required|string|between:6,20',
  },
};
