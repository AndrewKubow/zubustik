import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

import { customDate } from '../../../../utils/date';

const NoTrips = ({ date, changeDay, regularHelp, isLoading, arrived, departure, freePlaces }) => {
  if (arrived.touch || departure.touch) {
    return (
      <div>
        <p className="trip__notfound">По данным параметрам рейсов не найдено.</p>
      </div>
    );
  }

  if (date.nextRoute && !date.isEmpty) {
    return (
      <div>
        <p className="trip__notfound">По данным параметрам рейсов не найдено.</p>
        <p className="trip__nextday">Возможно, закончились свободные места, или на этот день рейсов нет.</p>
        <p className="trip__nextday">
          Следующий ближайший рейс:<br/>
          {date.nextRoute ? <a onClick={changeDay.bind(null, date.nextRoute, 'fadeOutDown', 'fadeIn')}>{customDate.getDayForRegular(date.nextRoute)}</a> : null}
        </p>
      </div>
    );
  }

  if (regularHelp && !regularHelp.isEmpty && !isLoading) {
    return (
      <div>
        <p className="trip__notfound">По данным параметрам рейсов не найдено.</p>
        <p className="trip__nextday">Регулярность рейсов:</p>
        <p className="trip__nextday">{`${regularHelp.forward.ctFromName} - ${regularHelp.forward.ctToName}: ${regularHelp.forward.regulname}`}</p>
        <p className="trip__nextday">{`${regularHelp.backward.ctFromName} - ${regularHelp.backward.ctToName}: ${regularHelp.backward.regulname}`}</p>
      </div>
    );
  }

  if ((regularHelp.isEmpty || date.isEmpty) && !isLoading) {
    return (
      <div>
        <p className="trip__notfound">Данный рейс в текущий момент в системе отсутствует. <br />Однако, в ближайшее время возможно появится.</p>
      </div>
    );
  }

  if (!freePlaces) {
    return (
      <div>
        <p className="trip__notfound">На данную дату свободные места отсутствуют.</p>
      </div>
    );
  }

  return null;
};

export default NoTrips;
