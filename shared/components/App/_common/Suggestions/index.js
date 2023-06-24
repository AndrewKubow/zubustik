import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import './suggestion.scss';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Suggestion extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  renderSuggestion = suggestion =>
    this.props.bestOffers ? (
      <span className="react-autosuggest__name" data-id={suggestion.id}>
        {suggestion.text}
      </span>
    ) : (
      <span className="react-autosuggest__name" data-id={suggestion.id}>
        {suggestion.name}, <span className="react-autosuggest__country">{suggestion.country}</span>
      </span>
    );

  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const { source } = this.props;

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(`^${escapedValue}`, 'i');
    return source.filter(city => regex.test(this.props.bestOffers ? city.text : city.name));
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: typeof newValue !== 'undefined' ? newValue : '',
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method },
  ) => {
    const route = {
      data: suggestion,
      direction: this.props.id,
    };

    this.props.handleChange(route);
  };

  getSuggestionValue = suggestion => (this.props.bestOffers ? suggestion.text : suggestion.name);

  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== undefined) {
      this.setState({
        value: nextProps.city,
      });
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 1) {
      this.setState({
        suggestions: this.getSuggestions(value),
      });
    }
    if (value.length <= 2 && this.state.suggestions.length) {
      this.onSuggestionsClearRequested();
    }
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  clearField = () => {
    const route = {
      data: {},
      direction: this.props.id,
    };

    this.props.handleChange(route);
    this.setState({
      value: '',
      suggestions: [],
    })
  }

  render() {
    const { suggestions, value } = this.state;
    const { label } = this.props;
    const inputProps = {
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        id={this.props.id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        renderInputComponent={inputProps => (
          <div className="react-autosuggest__input-wrapper">
            {inputProps.value === '' ? <span className="search__label">{label}</span> : null}
            <input {...inputProps} />
            {inputProps.value !== '' ? <i className="fa fa-times search__clear-input" aria-hidden="true" onClick={this.clearField} /> : null}
          </div>
        )}
      />
    );
  }
}

export default Suggestion;
