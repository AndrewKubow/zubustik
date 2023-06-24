import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getLabelComp = label => <p className="label">{label} <br />(местное время)</p>;

const getLabel = (k, l, croute = false, allroute = false) => {
  if ((croute || croute === 0) && allroute) {
    if (!k && !croute) return getLabelComp('Отправление');
    if ((k + 1) === l && (croute + 1) === allroute) return getLabelComp('Прибытие');
    if (k === 0 && croute) return false;
    return null;
  }
  if (!k) {
    return getLabelComp('Отправление');
  } else if ((k + 1) === l) {
    return getLabelComp('Прибытие');
  }

  return null;
};

const getNameRace = nameRace => (
  <div className="row">
    <div className="col-md-12 col-md-offset-2">
      <p className="race-name"><span>Рейс:</span> {nameRace}</p>
    </div>
  </div>
);

const Routes = ({ details, segment }) => {
  const isChange = details.length > 1;

  return (
    <div>
      {details.map((item, croute, allroute) => {
        return (
          <div key={croute + Date.now()} className="stations-list">
            {item.route.map((route, key, array) => {
              const label = isChange ? getLabel(key, array.length, croute, allroute.length) : getLabel(key, array.length);
              const time = route.timeDep !== '-' ? route.timeDep : route.timeArr;
              const stationName = classNames('station__name', {
                last: (key + 1) === array.length,
              });
              return (
                <div key={key + Date.now()}>
                  {(label === false)
                    ? <div className="row">
                      <div className="col-md-4">
                        <p className="station__change__label">Пересадка</p>
                      </div>
                      <div className="col-md-8">
                        <div className="station__change">
                          <p className="station__change__time">Время пересадки: <span>{`${item.changehours}:${item.changeminutes}`}</span></p>
                          <p className="station__change__name">{route.stArrName}</p>
                        </div>
                      </div>
                    </div>
                  : null}
                  <div>
                    { !key && !segment ? getNameRace(item.raceName) : null }
                    <div className="row">
                      <div className="col-md-4">
                        {label}
                      </div>
                      <div className="col-md-8">
                        <p className="station">{time}</p>
                        <p className={stationName}>{route.stArrName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })
    }
    </div>);
};

Routes.PropTypes = {
  details: PropTypes.any,
};

export default Routes;
