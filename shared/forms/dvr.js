import lang from './lang/ru';

export const shouldBeEqualTo = target => ({ field, form }) => {
  const fieldsAreEquals = form.$(target).value === field.value;
  return [fieldsAreEquals, 'Пароли не совпадают'];
};

const rules = {
  telephone: {
    function: value => value.match(/^\d{2}\d{3}\d{3}\d{2}\d{2}$/),
    message: 'Введите номер телефона в формате 380673332211.',
  },
  strongPassword: {
    function: value => value.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g),
    message:
      'Пароль слишком прост (не содержит хотя-бы одну большую, одну маленькую латинскую букву и цифру).',
  },
};

export default ($validator) => {
  // register sync rules
  $validator.setMessages('ru', lang);
  $validator.useLang('ru');
  Object.keys(rules).forEach(key =>
    $validator.register(key, rules[key].function, rules[key].message),
  );
};
