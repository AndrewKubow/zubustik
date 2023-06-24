import React, { Component } from 'react';
import AutoCompleteField from 'material-ui/AutoComplete';

import './autoComplete.scss';

const style = {
  hintWrapper: {
    bottom: 7,
    color: '#000000',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
  },
  main: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'PF DinDisplay Pro',
    maxHeight: 500,
    overflow: 'auto',
    zIndex: 10,
  },
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onChange = (e) => {
    const route = {
      data: e,
      direction: this.props.id,
    };

    this.props.handleChange(route);
  };

  handleInput = (value) => {
    if (value.length > 1) {
      this.setState({
        open: true,
      });
    }
    if (value.length <= 2 && this.state.open) {
      this.setState({
        open: false,
      });
    }
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    const { handleChange, customConfig, label, source, id, city } = this.props;
    return (
      <AutoCompleteField
        onClick={this.handleTouchTap}
        popoverProps={{
          open: this.state.open,
          anchorEl: this.state.anchorEl,
        }}
        onUpdateInput={this.handleInput}
        onNewRequest={this.onChange}
        id={id}
        dataSourceConfig={customConfig}
        dataSource={source}
        filter={(searchText, key) => {
          const search = searchText.toLowerCase();
          const regexp = new RegExp(`^${search}`);
          return search !== '' && regexp.test(key.toLowerCase());
        }}
        searchText={city}
        textFieldStyle={style.main}
        hintText={<span className="search__label">{label}</span>}
        hintStyle={style.hintWrapper}
        fullWidth
        maxSearchResults={100}
        style={style.main}
        listStyle={style.main}
        name={id}
      />
    );
  }
}

export default AutoComplete;
