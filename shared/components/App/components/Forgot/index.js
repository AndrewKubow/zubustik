import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { observer } from 'mobx-react';

import TextField from '../../_common/TextField';
// import { fields } from '../../../../forms/setup/forgot';
import form from '../../../../forms/store/Forgot';

const getMsg = (status) => {
  if (form.status === 200) {
    return <p className="success-reset">{form.msg}</p>;
  }

  return (
    <form name="forgot" autoComplete="off">
      <p>Введите E-mail для восстановления пароля.</p>
      <TextField field={form.$('email')} type="email" forgot error={form.msg} />
    </form>
  );
};

const Forgot = ({ open, close }) => {
  const actions = [
    <FlatButton label="Отмена" onTouchTap={close} />,
    <FlatButton primary label="Восстановить" onClick={form.onSubmit} />,
  ];

  const resetPassword = getMsg(form.error);

  return (
    <Dialog
      title="Восстановление пароля"
      actions={form.status !== 200 ? actions : <FlatButton label="Закрыть" onTouchTap={close} />}
      modal={false}
      open={open}
      onRequestClose={close}
    >
      {resetPassword}
    </Dialog>
  );
};

export default observer(Forgot);
