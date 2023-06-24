import React from 'react';
import Paper from 'material-ui/Paper';

import './selectedBus.scss';

const SelectedBus = () => {
  return (
    <div className="selected-bus container">
      <Paper zDepth={1} rounded={false}>
        <div className="row selected-bus__row">
          <div className="col-md-2 selected-bus__title">
            <p>Туда</p>
          </div>
          <div className="col-md-3 selected-bus__from">
            <p>Ивано франковск</p>
          </div>
          <div className="col-md-3 selected-bus__to">
            <p>Киев</p>
          </div>
          <div className="col-md-3 selected-bus__date">
            <p>21 марта 2017</p>
          </div>
          <div className="col-md-1 selected-bus__clear">
            <p>x</p>
          </div>
        </div>
        <div className="row selected-bus__row">
          <div className="col-md-2 selected-bus__title">
            <p>Назад</p>
          </div>
          <div className="col-md-3 selected-bus__from">
            <p>Ивано франковск</p>
          </div>
          <div className="col-md-3 selected-bus__to">
            <p>Киев</p>
          </div>
          <div className="col-md-3 selected-bus__date">
            <p>22 марта 2017</p>
          </div>
          <div className="col-md-1 selected-bus__clear">
            <p>x</p>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default SelectedBus;
