import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const getListCountry = (menuItem, category) =>
  menuItem.map(item => (
    <MenuItem value={`${category}-${item.idCn}`} primaryText={item.nameCn} key={item.idCn} />
  ));

const getListCity = (menuItem, category) =>
  menuItem.map(item => (
    <MenuItem value={`${category}-${item.idCity}`} primaryText={item.nameCity} key={item.idCity} />
  ));

const DropDown = ({ callback, menuItem, selected, category }) => {
  const list = getListCountry(menuItem, category);

  return (
    <DropDownMenu value={selected} onChange={callback}>
      {list}
    </DropDownMenu>
  );
};

export default DropDown;
