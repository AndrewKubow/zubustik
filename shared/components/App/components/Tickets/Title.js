import React from 'react';

export default () => (
  <div className="container-fluid">
    <div className="row header">
      <div className="col-md-3">
        <p className="tickets-header">отправление</p>
      </div>
      <div className="col-md-2">
        <p className="tickets-header">в пути</p>
      </div>
      <div className="col-md-3">
        <p className="tickets-header">прибытие</p>
      </div>
      <div className="col-md-2">
        <p className="tickets-header">место</p>
      </div>
      <div className="col-md-2">
        <p className="tickets-header">цена</p>
      </div>
    </div>
  </div>
);
