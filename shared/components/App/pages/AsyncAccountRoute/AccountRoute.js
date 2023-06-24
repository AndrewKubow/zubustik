import React from 'react';
import Helmet from 'react-helmet';
import Route from 'react-router-dom/Route';
import NavLink from 'react-router-dom/NavLink';
import Switch from 'react-router-dom/Switch';

import AccountInfo from '../../components/Account/info';
import Tickets from '../../components/Tickets';
// import PersonalDiscount from '../../_common/PersonalDiscount';
import './account.scss';

function AccountRoute({ match }) {
  return (
    <main className="account mycontainer">
      <Helmet>
        <title>Мой кабинет</title>
      </Helmet>
      <div className="noprint">
        <ul className="account__nav">
          <li className="account_li">
            <NavLink to={`${match.url}`} activeClassName="selected" exact>
              Мой профиль
            </NavLink>
          </li>
          <li className="tickets_li">
            <NavLink to={`${match.url}/tickets`} activeClassName="selected" exact>
              Мои билеты
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path={`${match.url}`} exact component={AccountInfo} />
        <Route path={`${match.url}/tickets`} exact component={Tickets} />
      </Switch>
    </main>
  );
}

export default AccountRoute;
