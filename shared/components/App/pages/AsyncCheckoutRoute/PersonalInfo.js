import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import AditionalPersonalInfo from './AditionalPersonalInfo';

import './personal.scss';

const PersonalInfo = (props) => {
  const {
    lgotes,
    raceId,
    number,
    price,
    currency,
    data,
    changeName,
    changeDiscount,
    isDocNeed,
    autoLgot,
    isAction,
  } = props;
  let list = [<MenuItem value="full" key={Math.random()} primaryText="Полная стоимость" />];
  const lg = lgotes.map(item => (
    <MenuItem value={item.code} key={item.code} primaryText={item.name} />
  ));

  list = list.concat(lg);

  return (
    <div className={'personal' + (isDocNeed ? ' personal--extended' : '')}>
      <div className="row">
        <div className="col-md-1">
          <div className="circle">{number}</div>
		      <span className="passlabel showmobileib">Пасажир</span>
        </div>
        <div className="col-md-3 personal__textfield">
          <TextField
            id={`${raceId}-${number - 1}`}
            name="name"
            floatingLabelText="ИМЯ"
            value={data.name}
            onChange={changeName}
            errorText={data.error && data.name.length < 2 ? 'Введите пожалуйста Ваше имя.' : ''}
            fullWidth
          />
        </div>
        <div className="col-md-3 personal__textfield">
          <TextField
            id={`${raceId}-${number - 1}`}
            name="lastName"
            floatingLabelText="ФАМИЛИЯ"
            value={data.lastName}
            onChange={changeName}
            errorText={
              data.error && data.lastName.length < 2 ? 'Введите пожалуйста Вашу фамилию.' : ''
            }
            fullWidth
          />
        </div>
        <div className="col-md-3">
          {isAction ? <div className="personal__auto-lgot">&nbsp;</div> : null}
          <div style={isAction ? {display: 'none'} : {}}>
            {!autoLgot ? (
              <SelectField
                value={data.lgot}
                onChange={(e, k, v) => changeDiscount(`${raceId}-${number - 1}`, e, k, v)}
                fullWidth
                autoWidth
                floatingLabelText="СКИДКИ"
              >
                {list}
              </SelectField>
            ) : <div className="personal__auto-lgot">&nbsp;</div>}
          </div>
        </div>
        <div className="col-md-2 wrapper-price">
          <p className="price">
            <span>{price}</span> <span className="currency">{currency}</span>
          </p>
        </div>
      </div>
      {isDocNeed ? <AditionalPersonalInfo raceId={raceId} number={number} data={data} /> : null}
    </div>
  );
};

PersonalInfo.defaultProps = {
  lgotes: [],
};

PersonalInfo.propTypes = {
  currency: PropTypes.string.isRequired,
  lgotes: PropTypes.arrayOf(PropTypes.any),
  raceId: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  changeName: PropTypes.func.isRequired,
  changeDiscount: PropTypes.func.isRequired,
};

export default PersonalInfo;
