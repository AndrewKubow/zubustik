import React from 'react';
import { observer } from 'mobx-react';
import TextField from 'material-ui/TextField';

const styled = {
  hint: {
    color: '#bababa',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
  },
  input: {
    color: '#ffffff',
    padding: 'none',
  },
  underline: {
    borderColor: '#ffffff',
  },
  error: {
    color: '#ffffff',
  },
};

const styledAcc = {
  hint: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
  },
  input: {
    color: '#000000',
  },
  underline: {
    borderColor: '#66bb6a',
  },
  error: {
    color: '#f44336',
  },
};

const getStyle = (account, forgot) => {
  switch (true) {
    case account:
      return styledAcc;
    case forgot:
      return {};
    case !account:
      return styled;
    default:
      return {};
  }
};

export default observer(
  ({
    field,
    type = 'text',
    validatingText = 'validating...',
    value,
    account,
    forgot,
    error,
    fullWidth,
    floatingLabelText,
    plHide,
  }) => {
    const style = getStyle(account, forgot);
    const errorMsg = error || field.error;
    const floatingText = false; // floatingLabelText || (account && value) ? value : false;
    const pl = plHide ? null : account && value ? value : field.placeholder;

    return (
      <TextField
        {...field.bind({ type, validatingText })}
        placeholder={pl}
        name={field.name}
        errorText={errorMsg}
        hintStyle={style.hint}
        underlineFocusStyle={style.underline}
        inputStyle={style.input}
        errorStyle={style.error}
        floatingLabelText={floatingText}
        fullWidth={fullWidth}
        style={{ height: 40 }}
      />
    );
  },
);
