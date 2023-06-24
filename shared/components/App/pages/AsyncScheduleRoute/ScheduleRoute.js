import React from 'react';
import Helmet from 'react-helmet';
import { Route } from 'react-router-dom';

import Schedule from '../../components/Schedule';
import ScheduleCity from '../../components/ScheduleCity';
import './schedule.scss';

function ScheduleRoute({ match }) {
  return (
    <main className="schedule__route mycontainer">
      <Helmet>
        <title>Расписание</title>
      </Helmet>
      <Route exact path={`${match.url}`} component={Schedule} />
      <Route exact path={`${match.url}/:cityId`} component={ScheduleCity} />
    </main>
  );
}

export default ScheduleRoute;
