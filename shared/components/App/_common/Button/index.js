import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styleCommon = {
  button: {
    borderRadius: 20,
    cursor: 'pointer',
  },
  label: { fontSize: 18 },
  common: {
    height: 42,
    width: 135,
    borderRadius: 20,
  },
};

const styleMini = {
  label: {
    fontSize: 20,
    textTransform: 'none',
  },
  common: {
    position: 'absolute',
    right: 17,
    height: 42,
    width: 135,
    borderRadius: 20,
    bottom: 17,
  },
};

const PrimaryButton = (props) => {
  const style = props.cardMini ? { ...styleCommon, ...styleMini } : styleCommon;
  const styleButtom = props.disabled
    ? { ...style.button, ...{ cursor: 'not-allowed' } }
    : style.button;

  return (
    <RaisedButton
      label={props.label}
      backgroundColor="#66bb6a"
      labelColor="#fff"
      style={style.common}
      labelStyle={style.label}
      buttonStyle={styleButtom}
      overlayStyle={styleButtom}
      onClick={props.submit}
      disabled={props.disabled}
      disabledBackgroundColor="#94cf97"
      disabledLabelColor="#ffffff"
      fullWidth={props.fullWidth}
    />
  );
};

export default PrimaryButton;
