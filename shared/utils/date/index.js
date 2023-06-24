const weekday = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const month = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const getSelectedMinute = (date) => {
  const selectedDay = date.getMinutes();
  return selectedDay < 10 ? `0${selectedDay}` : selectedDay;
};

const getSelectedHour = (date) => {
  const selectedDay = date.getHours();
  return selectedDay < 10 ? `0${selectedDay}` : selectedDay;
};

const getSelectedDay = (date) => {
  const selectedDay = date.getDate();
  return selectedDay < 10 ? `0${selectedDay}` : selectedDay;
};

const getSelectedWeekday = date => weekday[date.getDay()];

const getSelectedMonth = date => month[date.getMonth()];
const getMonthSearch = (date) => {
  const selectedMonth = date.getMonth() + 1;
  return selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
};

const getDateParse = date =>
  `${date.getFullYear()}-${getMonthSearch(date)}-${getSelectedDay(date)}`;
const getDayForRegular = date => `${getSelectedDay(date)} ${getSelectedMonth(date)}`;

const formatDate = (date) => {
  const arr = date.split(/[- :]/);
  const cDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);

  return `${getSelectedHour(cDate)}:${getSelectedMinute(cDate)}, ${getSelectedWeekday(
    cDate,
  )}, ${cDate.getDate()} ${getSelectedMonth(cDate)}`;
};

const formatDateWithoutTime = (date) => {
  const arr = date.split(/[- :]/);
  const cDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]);

  return `${getSelectedWeekday(cDate)}, ${cDate.getDate()} ${getSelectedMonth(cDate)}`;
};

const getTime = (date) => {
  const cDate = new Date(date);
  return `${getSelectedHour(cDate)}:${getSelectedMinute(cDate)}`;
};

const oneDay = 1000 * 60 * 60 * 24;
const yesterday = cDay => new Date(cDay.getTime() + oneDay * -1);
const tomorrow = cDay => new Date(cDay.getTime() + oneDay * 1);

export const customDate = {
  getTime,
  getMinute: getSelectedMinute,
  getHour: getSelectedHour,
  getDay: getSelectedDay,
  getWeekday: getSelectedWeekday,
  getMonth: getSelectedMonth,
  getFormatDate: formatDate,
  getFormatDateWithoutTime: formatDateWithoutTime,
  oneDay,
  getYesterday: yesterday,
  getTomorrow: tomorrow,
  getDateParse,
  getDayForRegular,
};
