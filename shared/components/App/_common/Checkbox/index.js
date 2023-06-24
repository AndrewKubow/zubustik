import React from 'react';
import { observer } from 'mobx-react';
import Checkbox from 'material-ui/Checkbox';

const styled = {
  main: {
    display: 'inline-block',
    width: '',
    marginRight: 10,
  },
  input: {
    marginRight: 6,
    color: '#ffffff',
    fill: '#ffffff',
    borderRadius: 5,
  },
  label: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
    width: '100%',
  },
};

const styledAc = {
  main: {
    display: 'inline-block',
    width: '',
    marginRight: 10,
  },
  input: {
    marginRight: 6,
    color: '#30383b',
    fill: '#30383b',
    borderRadius: 5,
  },
  label: {
    color: '#30383b',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
  },
};

export default observer(({ field = {}, checked, account, label, id, name, onToggle }) => {
  const style = account ? styledAc : styled;

  return (
    <Checkbox
      style={style.main}
      iconStyle={style.input}
      labelStyle={style.label}
      label={field.label || label}
      id={field.id || id}
      name={field.name || name}
      onCheck={field.onToggle || onToggle}
      defaultChecked={account ? !!checked : null}
    />
  );
});
