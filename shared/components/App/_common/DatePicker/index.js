import React from 'react';
import Picker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

import './datepiker.scss';

const style = {
  dialog: {
    minHeight: 0,
  },
};

/* locales date picker */
let DateTimeFormat;

if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru');
}

const DatePicker = props => {
  const { dialog, changeData, cDate, ...rest } = props;
  return (
    <Picker
      dialogContainerStyle={style.dialog}
      hideCalendarDate
      hintText={<label className="search__label-datepicker">{props.label}</label>}
      okLabel={null}
      container={dialog ? 'dialog' : 'inline'}
      locale={'ru'}
      DateTimeFormat={DateTimeFormat}
      cancelLabel={'Отмена'}
      fullWidth
      minDate={props.minDate}
      autoOk
      onChange={(e, date) => changeData({ date, datepiker: props.id })}
      id={props.id}
      value={cDate}
      {...rest}
    />
  );
}

export default DatePicker;
