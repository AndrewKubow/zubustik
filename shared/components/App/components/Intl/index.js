import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './intl.scss';

class IntlSwitch extends Component {
  handleChange = (event, index, value) => {
    const { locale } = this.props.common;
    if (locale !== value) {
      this.props.common.refreshLangIfNeeded(value);
    }
  };

  getStyle() {
    return {
      main: {
        width: this.props.isMobile ? '100%' : 61,
        fontSize: this.props.isMobile ? 16 : 14,
        fontWeight: 500,
        fontFamily: 'PF DinDisplay Pro',
        height: 'auto',
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
        height: 'auto',
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
    const { locale, enabledLanguages } = this.props.common;
    const intlNodes = enabledLanguages.map(lang => (
      <MenuItem value={lang} key={lang} primaryText={this.props.common[lang]} />
    ));
    const style = this.getStyle();

    return (
      <li className="intl">
        <SelectField
          value={locale}
          onChange={this.handleChange}
          style={style.main}
          underlineStyle={style.underline}
          underlineFocusStyle={style.underline}
          labelStyle={style.labelStyle}
          iconStyle={style.icon}
          menuStyle={style.menuStyle}
          id={locale}
        >
          {intlNodes}
        </SelectField>
      </li>
    );
  }
}

export default inject('common')(observer(IntlSwitch));
