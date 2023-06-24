import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './nobus.scss';

const getLabel = (number) => {
  switch (true) {
    case number === 1: return 'пассажир';
    case number > 1 && number < 5: return 'пассажира';
    case number > 4 : return 'пассажиров';
    default: return 'пассажир';
  }
};

const NoBus = (props) => {
  const { places, raceId, changePlaces, selected } = props;
  const list = places.map((item, key) => {
    const nubmer = key + 1;
    const label = getLabel(nubmer);

    return (
      <MenuItem
        value={nubmer}
        key={item.num}
        label={<span className="passanger">{`${nubmer} ${label}`}</span>}
        primaryText={`${nubmer} ${label}`}
      />
    );
  });

  return (
    <div className="no-bus">
      <div className="no-bus__text">
        <p><strong>Этот перевозчик не предоставляет возможность выбрать место заранее.</strong></p>
        <p>Это значит, что место в салоне вы сможете выбрать только при отправлении.</p>
      </div>
      <div className="row">
        <div className="col-md-4 col-md-offset-4 text-center">
          <DropDownMenu onChange={(e, k, v) => changePlaces(raceId, e, k, v)} value={selected}>
            {list}
          </DropDownMenu>
        </div>
      </div>
      <div className="no-bus__number-label">
        выберите количество пассажиров
      </div>
    </div>
  );
};

export default NoBus;
