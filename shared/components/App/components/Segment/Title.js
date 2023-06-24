import React from 'react';

import './title.scss';

const Title = ({ dep, arr }) => (
  <div className="row title__segment">
    <div className="col-md-12">
      <h1><span>Билеты на автобус</span><br />{dep} - {arr}</h1>
    </div>
  </div>
);

export default Title;
