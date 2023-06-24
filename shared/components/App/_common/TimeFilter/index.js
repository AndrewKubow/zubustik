import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import './timefilter.scss';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class TimeFilter extends Component {
  handleChange = (v, e) => {
    if (v === false) {
      this.props.changeTime(false);
      return true;
    }
    this.props.changeTime(
      {
        [v]: e,
      },
      this.props.id,
    );
  };

  tipFormatter = (value) => {
    if (value < 10) return `0${value}:00`;
    if (value > 10 && value !== 24) return `${value}:00`;
    if (value === 24) return '23:59';

    return '10:00';
  };

  clearFilter = (e) => {
    const direction = e.target.dataset.direction;
    if (direction) {
      this.handleChange(direction, [0, 24]);
    }
  };

  render() {
    const back = this.props.data.back.slice();
    const forward = this.props.data.forward.slice();

    return (
      <div>
        <div className="wrapper-time-filter" onClick={this.handleChange.bind(null, false)} />
        <div className="time-filter">
          <div className="time-filter__close" onClick={this.handleChange.bind(null, false)}>
            x
          </div>
          <p className="time-filter__title">Туда</p>
          <p className="time-filter__time">{`${this.tipFormatter(forward[0])} - ${this.tipFormatter(
            forward[1],
          )}`}</p>
          <div className="range-wrapper">
            <Range
              min={0}
              max={24}
              value={[forward[0], forward[1]]}
              defaultValue={forward.length ? forward : [0, 24]}
              tipFormatter={this.tipFormatter}
              onChange={this.handleChange.bind(null, 'forward')}
              allowCross={false}
            />
            <i
              className="fa fa-times range-cancel"
              aria-hidden="true"
              data-direction="forward"
              onClick={this.clearFilter}
            />
          </div>
          <p className="time-filter__title">Обратно</p>
          <p className="time-filter__time">{`${this.tipFormatter(back[0])} - ${this.tipFormatter(
            back[1],
          )}`}</p>
          <div className="range-wrapper">
            <Range
              min={0}
              max={24}
              value={[back[0], back[1]]}
              defaultValue={back.length ? back : [0, 24]}
              tipFormatter={this.tipFormatter}
              onChange={this.handleChange.bind(null, 'back')}
              allowCross={false}
            />
            <i
              className="fa fa-times range-cancel"
              aria-hidden="true"
              data-direction="back"
              onClick={this.clearFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TimeFilter;
