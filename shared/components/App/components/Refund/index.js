import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import TextArea from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { formOnCard, formOnAccount } from '../../../../forms/store/Refund';
import TextField from '../../_common/TextField';

import './refund.scss';

const styled = {
  radioButton: {
    marginBottom: 16,
  },
  dialog: {
    width: '80%',
    maxWidth: 'none',
  },
};

@inject('auth')
@observer
class Refund extends Component {
  componentWillMount() {
    this.clearData();
  }

  clearData() {
    this.props.auth.clearRefund();
    formOnCard.clear();
    formOnAccount.clear();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.state !== nextProps.state) {
      this.clearData();
    }
  }

  setReason = (event, key, payload) => {
    if (payload !== '2') {
      this.props.auth.otherReason = '';
    }
    this.props.auth.setReasonRefund(payload);
  };

  setOtherReason = (event, value) => {
    this.props.auth.setOtherReason(value);
  };

  setPaymentMethod = (event, value) => {
    formOnCard.clear();
    formOnAccount.clear();
    this.props.auth.setPaymentMethodRefund(value);
  };

  getPaymantForm = () => {
    const { paymentMethod } = this.props.auth.refund;

    switch (paymentMethod) {
      case '1':
        return (
          <form className="row" name="refundOnCard">
            <div className="col-md-4">
              <TextField
                field={formOnCard.$('recipient')}
                type="text"
                fullWidth
                account
                floatingLabelText={formOnCard.$('recipient').label}
              />
            </div>
            <div className="col-md-4">
              <TextField
                field={formOnCard.$('cardnum')}
                type="text"
                fullWidth
                account
                floatingLabelText={formOnCard.$('cardnum').label}
              />
            </div>
          </form>
        );
      case '2':
        return (
          <form name="refundOnAccount">
            <div className="row">
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('bankname')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('bankname').label}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('bankmfo')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('bankmfo').label}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('bankaccount')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('bankaccount').label}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('recipient')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('recipient').label}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('inn')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('inn').label}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  field={formOnAccount.$('purpose')}
                  type="text"
                  fullWidth
                  account
                  floatingLabelText={formOnAccount.$('purpose').label}
                />
              </div>
            </div>
          </form>
        );
    }
  };

  validation = () =>
    this.props.auth.refund.reason === null ||
    (this.props.auth.refund.reason === '2' && !this.props.auth.otherReason) ||
    this.props.auth.refund.paymentMethod === null;

  handleSubmitRefund = () => {
    this.props.auth.submitRefund();
  };

  render() {
    if (formOnAccount.$('purpose').value === '') {
      formOnAccount.$('purpose').value = 'возврат денег за билет';
    }
    const actions = [
      <FlatButton label="Отмена" primary onClick={this.props.handleCloseRefund} />,
      <FlatButton
        label="Отправить заявление"
        primary
        disabled={this.validation()}
        onClick={
          this.props.auth.refund.paymentMethod === '1'
            ? formOnCard.onSubmit
            : this.props.auth.refund.paymentMethod === '2'
              ? formOnAccount.onSubmit
              : this.handleSubmitRefund
        }
      />,
    ];
    return (
      <Dialog
        contentStyle={styled.dialog}
        autoScrollBodyContent
        title="Возврат билета"
        actions={actions}
        modal
        open={this.props.state}
        contentClassName="refund"
      >
        <div className="row refund__step">
          <div className="col-md-1">
            <div className="circle">1</div>
          </div>
          <div className="col-md-11">
            <p>Причина возврата билета</p>
          </div>
        </div>
        {/* <div className="row refund__title">
          <div className="col-md-4">Номер билета</div>
          <div className="col-md-4">Пассажир</div>
          <div className="col-md-4">Причина возврата</div>
        </div>
        <hr className="refund__divider" /> */}
        <div className="row">
          {/* <div className="col-md-4 refund__text-field">{this.props.dataRefund.ticketId}</div>
          <div className="col-md-4 refund__text-field">{this.props.dataRefund.fio}</div> */}
          <div className="col-md-offset-1 col-md-4">
            <SelectField
              floatingLabelText="Выберите причину возврата"
              value={this.props.auth.refund.reason}
              autoWidth
              fullWidth
              onChange={this.setReason}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value={0} primaryText="Отмена рейса перевозчиком" />
              <MenuItem value={1} primaryText="Отмена поездки" />
              <MenuItem value={2} primaryText="Другая причина" />
            </SelectField>
          </div>
        </div>
        {/* <hr className="show-desktop" /> */}
        {this.props.auth.refund.reason === 2 ? (
          <TextArea
            value={this.props.auth.otherReason}
            multiLine
            fullWidth
            hintText="Причина возврата"
            floatingLabelText="Причина возврата"
            rows={2}
            onChange={this.setOtherReason}
            name="otherReason"
          />
        ) : null}
        <div className="row refund__step">
          <div className="col-md-1">
            <div className="circle">2</div>
          </div>
          <div className="col-md-11">
            <p>Способ возврата средств</p>
          </div>
        </div>
        <div className="refund__payment-methods">
          <RadioButtonGroup
            name="paymentMethod"
            onChange={this.setPaymentMethod}
            valueSelected={this.props.auth.refund.paymentMethod}
          >
            <RadioButton
              value="0"
              label="Я хочу вернуть деньги на банковскую карту, которой оплачивал билет"
              style={styled.radioButton}
            />
            <RadioButton
              value="1"
              label="Я оплачивал билет не банковской картой, но у меня есть карта ПриватБанка, на которую хочу получить деньги"
              style={styled.radioButton}
            />
            <RadioButton
              value="2"
              label="Я хочу вернуть деньги на банковский счет"
              style={styled.radioButton}
            />
          </RadioButtonGroup>
        </div>
        {this.getPaymantForm()}
        {this.props.auth.refund.paymentMethod ? (
          <div className="refund__terms">
            <p>
              Нажав на кнопку "Отправить заявление", Вы подтверждаете достоверность указанных
              данных.
            </p>
            <p>Деньги Вам будут возвращены в соответствии с условиями возврата данного рейса.</p>
          </div>
        ) : null}
      </Dialog>
    );
  }
}

export default Refund;
