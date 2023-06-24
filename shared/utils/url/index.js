/* eslint-disable import/prefer-default-export */

const availableLangs = ['ru', 'ua'];

const validate = urlLang => availableLangs.find(lang => lang === urlLang);

const parseUrlLang = url => url.slice(1, 3);

export const getLang = (url) => {
  const lang = validate(parseUrlLang(url));

  return lang || '';
};
