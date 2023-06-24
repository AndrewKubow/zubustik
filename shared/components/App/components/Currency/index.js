import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Currency extends Component {
  handleChange = (event, index, value) => {
    const { current } = this.props.common;
    if (current !== value) {
      this.props.common.setCurrency(value);
    }
  };

  getStyle() {
    return {
      main: {
        width: this.props.isMobile ? '100%' : 61,
        fontSize: this.props.isMobile ? 16 : 14,
        fontWeight: 500,
        fontFamily: 'PF DinDisplay Pro',
        height: 'auto'
      },
      underline: {
        border: 'none',
      },
      labelStyle: {
        overflow: 'inherit',
        lineHeight: 'inherit',
        position: 'initial',
        paddingLeft: 5,
        color: this.props.isMobile ? '#fff' : 'inherit',
        height: 'auto'
      },
      icon: {
        display: this.props.isMobile ? 'none' : 'inline-block',
        padding: 0,
        width: 35,
        height: 35,
        right: 13,
      },
      menuStyle: {
        width: 80,
      },
    };
  }

  render() {
    const { current, avalibleCurrency } = this.props.common;
    const currencyNodes = avalibleCurrency.map((currency, key) => (
      <MenuItem value={key} key={key} primaryText={currency} />
    ));
    const style = this.getStyle();

    return (
      <li className="currency">
        <SelectField
          value={current}
          onChange={this.handleChange}
          style={style.main}
          underlineStyle={style.underline}
          underlineFocusStyle={style.underline}
          labelStyle={style.labelStyle}
          iconStyle={style.icon}
          menuStyle={style.menuStyle}
          id={`${current}`}
        >
          {currencyNodes}
        </SelectField>
      </li>
    );
  }
}

export default inject('common')(observer(Currency));
