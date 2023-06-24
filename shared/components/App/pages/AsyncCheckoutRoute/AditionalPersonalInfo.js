import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import areIntlLocalesSupported from 'intl-locales-supported';

import { customDate } from '../../../../utils/date';

import './aditional.scss';

/* locales date picker */
let DateTimeFormat;

if (areIntlLocalesSupported(['ru'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/ru');
}

const errorStyle = {
  textTransform: 'none',
};

const sex = [
  {
    id: 0,
    name: 'Женский',
  },
  {
    id: 1,
    name: 'Мужской',
  },
];

@inject('checkout')
@observer
class AditionalPersonalInfo extends Component {
  componentDidMount() {
    this.props.checkout.fetchCountries();
    this.props.checkout.fetchDocs();
  }

  getList = (data) => {
    if (!data.length) return null;

    return data.map(item => <MenuItem value={item.id} key={item.id} primaryText={item.name} />);
  };

  changeData = (raceId, field, e, key, value) => {
    if (field !== 'passport') {
      this.props.checkout.setAditionalInfo(raceId, field, value);
    }
  };

  changePassport = (e, newValue) => {
    const { id, name } = e.target;

    this.props.checkout.updateTickets(id, name, newValue);
  };

  changeBirthday = (e, date) => {
    const value = customDate.getDateParse(date);

    this.props.checkout.setAditionalInfo(
      `${this.props.raceId}-${this.props.number - 1}`,
      'birthDay',
      value,
    );
  };

  render() {
    const { countries, isLoadingAdInfo, doctypes } = this.props.checkout;
    const listC = this.getList(countries);
    const listD = this.getList(doctypes);
    const listS = this.getList(sex);

    return (
      <div className="aditional-info">
        <div className="row">
          <div className="col-md-3 col-md-offset-1 aditional-info__doctype">
            <SelectField
              floatingLabelText="Тип документа"
              value={this.props.data.docType}
              autoWidth
              fullWidth
              onChange={(e, k, v) =>
                this.changeData(
                  `${this.props.raceId}-${this.props.number - 1}`,
                  'docType',
                  e,
                  k,
                  v,
                )}
              errorStyle={errorStyle}
              errorText={
                this.props.data.error && this.props.data.docType === ''
                  ? 'Необходимо выбрать Ваш действующий документ.'
                  : ''
              }
            >
              {listD}
            </SelectField>
          </div>
          <div className="col-md-3 aditional-info__num-doc">
            <TextField
              id={`${this.props.raceId}-${this.props.number - 1}`}
              name="passport"
              floatingLabelText="Номер документа"
              value={this.props.data.passport}
              errorStyle={errorStyle}
              onChange={this.changePassport}
              fullWidth
              errorText={
                this.props.data.error && this.props.data.passport === ''
                  ? 'Необходимо ввести номер документа.'
                  : ''
              }
            />
          </div>
          <div className="col-md-3 aditional-info__citizenship">
            <SelectField
              floatingLabelText="Гражданство"
              value={this.props.data.citizen}
              autoWidth
              fullWidth
              errorStyle={errorStyle}
              onChange={(e, k, v) =>
                this.changeData(
                  `${this.props.raceId}-${this.props.number - 1}`,
                  'citizen',
                  e,
                  k,
                  v,
                )}
              errorText={
                this.props.data.error && this.props.data.citizen === ''
                  ? 'Необходимо выбрать Ваше гражданство.'
                  : ''
              }
            >
              {listC}
            </SelectField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-md-offset-1 aditional-info__datepicker">
            <DatePicker
              DateTimeFormat={DateTimeFormat}
              fullWidth
              locale={'ru'}
              hintText="Дата рождения"
              cancelLabel={'Отмена'}
              errorStyle={errorStyle}
              openToYearSelection
              onChange={this.changeBirthday}
              errorText={
                this.props.data.error && this.props.data.birthDay === ''
                  ? 'Необходимо выбрать дату рождения.'
                  : ''
              }
            />
          </div>
          <div className="col-md-3 aditional-info__sex">
            <SelectField
              errorStyle={errorStyle}
              floatingLabelText="Пол"
              value={this.props.data.sex}
              autoWidth
              fullWidth
              onChange={(e, k, v) =>
                this.changeData(`${this.props.raceId}-${this.props.number - 1}`, 'sex', e, k, v)}
              errorText={
                this.props.data.error && this.props.data.sex === '' ? 'Необходимо выбрать пол.' : ''
              }
            >
              {listS}
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

AditionalPersonalInfo.defaultProps = {};

AditionalPersonalInfo.propTypes = {};

export default AditionalPersonalInfo;
