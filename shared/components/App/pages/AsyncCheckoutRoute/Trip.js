import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

import { customDate } from '../../../../utils/date';

import './trip.scss';

class Trip extends Component {
  state = {
    open: false,
  };

  showMore = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { trip, currency, hidePrice } = this.props;
    let dateDep,
      timeDep,
      dateArr,
      timeArr;
    [dateDep, timeDep] = trip.dtDep.split(' ');
    [dateArr, timeArr] = trip.dtArr.split(' ');
    dateArr = customDate.getFormatDateWithoutTime(trip.dtArr);
    dateDep = customDate.getFormatDateWithoutTime(trip.dtDep);
    const dtDepFormated = customDate.getFormatDate(trip.dtDep);
    const dtArrFormated = customDate.getFormatDate(trip.dtArr);
    const detailsClass = classNames({
      trip__details__down: !this.state.open,
      trip__details__up: this.state.open,
    });
    const direction =
      trip.cityDepName && trip.cityArrName
        ? `${trip.cityDepName} - ${trip.cityArrName}`
        : trip.raceName;

    return (
      <div>
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <p className="trip__city">
              <span className="trip__city-direction">{direction},</span>
              <span>{`отправление в ${dtDepFormated}`}</span>
            </p>
          </div>
          <div className="col-md-2 col-xs-12">
            <div className={detailsClass} onClick={this.showMore}>Подробно</div>
          </div>
        </div>
        <Collapse isOpened={this.state.open}>
          <div className="row">
            <div className="col-md-3 col-xs-12">
              <div className="col-md-12 col-xs-4 ">
                <div className="trip__time trip__time__departure ">
                  <span className="trip-departure-datetime show-desktop">{dtDepFormated}</span>
                  <span className="trip-departure-time show-mobile">{timeDep}</span>
                  <span className="trip-departure-date show-mobile">{dateDep}</span>
                </div>
              </div>
              <div className="col-md-12 col-xs-8">
                <p className="trip__station trip__station__departure">
                  {trip.stDepName},
                  <br /> {trip.stDepAddr}
                </p>
              </div>
            </div>
            <div className="col-md-2 col-xs-12">
              <div className="col-md-12 col-xs-4">
                <p className="trip__arrow-one showmobileib" />
                <p className="trip__duration showdesktopb">{`${trip.wayTimeH}ч ${trip.wayTimeM}мин`}</p>
              </div>
              <div className="col-md-12 col-xs-8">
                <p className="trip__arrow-one showdesktopib" />
                <p className="trip__duration showmobileb">{`${trip.wayTimeH}ч ${trip.wayTimeM}мин`}</p>
              </div>
            </div>
            <div className="col-md-3 col-xs-12">
              <div className="col-md-12 col-xs-4">
                <div className="trip__time trip__time__arrived">
                  <span className="trip-arrived-datetime show-desktop">{dtArrFormated}</span>
                  <span className="trip-arrived-time show-mobile">{timeArr}</span>
                  <span className="trip-arrived-date show-mobile">{dateArr}</span>
                </div>
              </div>
              <div className="col-md-12 col-xs-8">
                <p className="trip__station  trip__station__arrived">
                  {trip.stArrName},
                  <br /> {trip.stArrAddr}
                </p>
              </div>
            </div>
            <div className="col-md-2 col-md-offset-2 col-xs-12">
              <div className="col-md-12 col-xs-4 col-price">
                {hidePrice ? null : (
                  <p className="trip__price">
                    <span className="price">
                      {trip.autoLgot ? trip.autoLgot.price : trip.pricePass}
                    </span>
                    <span className="currency">{currency}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row second-row">
            <div className="col-md-5">
              <p className="trip__race-name">{`Рейс: ${trip.raceName}`}</p>
            </div>
            <div className="col-md-7">
              <p className="trip__owner">{`Перевозчик: ${trip.carrier}`}</p>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
Trip.defaultProps = {
  hidePrice: false,
};

Trip.propTypes = {
  currency: PropTypes.string.isRequired,
  hidePrice: PropTypes.bool,
  trip: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Trip;
