import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import AutoComplete from '../../_common/AutoComplete';
import Suggestions from '../../_common/Suggestions';

class Filter extends Component {
  state = {
    departure: null,
    arrived: null,
    departureName: '',
    arrivedName: '',
  };

  handleChange = (data) => {
    this.setState({
      [data.direction]: data.data.id,
      [`${data.direction}Name`]: data.data.text,
    });
    this.props.setFilter(data.direction, data.data.id);
  };

  clearFilter = () => {
    this.setState({
      departure: null,
      arrived: null,
      departureName: '',
      arrivedName: '',
    });
    this.props.clearFilter();
  };

  render() {
    return (
      <div className="row discounts__filter">
        <div className="col-md-4 col-xs-12 hidden-xs hidden-sm">
          <AutoComplete
            handleChange={this.handleChange}
            label="Откуда"
            id="departure"
            city={this.state.departureName}
            source={this.props.citiesDep.slice()}
          />
        </div>
        <div className="col-xs-12 visible-xs visible-sm">
          <Suggestions
            id="departure"
            label="Откуда"
            city={this.state.departureName}
            source={this.props.citiesDep.slice()}
            handleChange={this.handleChange}
            bestOffers
          />
        </div>
        <div className="col-md-4 col-xs-12 hidden-xs hidden-sm">
          <AutoComplete
            handleChange={this.handleChange}
            label="Куда"
            id="arrived"
            city={this.state.arrivedName}
            source={this.props.citiesArr.slice()}
          />
        </div>
        <div className="visible-xs visible-sm col-xs-12 discounts__filter-mobile">
          <Suggestions
            id="arrived"
            label="Куда"
            city={this.state.arrivedName}
            source={this.props.citiesArr.slice()}
            handleChange={this.handleChange}
            bestOffers
          />
        </div>
        <div className="col-md-2 col-xs-12">
          <RaisedButton
            label="Очистить"
            primary
            onClick={this.clearFilter}
            disabled={!(!!this.state.departure || !!this.state.arrived)}
          />
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  citiesArr: PropTypes.objectOf(PropTypes.any).isRequired,
  citiesDep: PropTypes.objectOf(PropTypes.any).isRequired,
  clearFilter: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
