import React from 'react';
import Avatar from 'material-ui/Avatar';
import PopoverMU from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

import './popover.scss';

const style = {
  main: {
    height: 35,
    width: 35,
    borderRadius: '5%',
  },
  list: {
    minWidth: 150,
  },
};

class Popover extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const name = String(this.props.name);
    const surname = String(this.props.surname);
    const initials = `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;

    return (
      <li className="popover" onTouchTap={this.handleTouchTap}>
        <Avatar style={style.main}>{initials}</Avatar>
        <span className="user-name">{name}</span>
        <PopoverMU
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu listStyle={style.list}>
            <MenuItem primaryText={<Link to="/account" className="account-link">Мой профиль</Link>} />
            <MenuItem primaryText={<Link to="/account/tickets" className="account-link">Мои билеты</Link>} />
            {/*<MenuItem primaryText={<Link to="/account/discount" className="account-link">Скидки</Link>} />*/}
            <MenuItem primaryText="Выйти" onClick={this.props.logout} />
          </Menu>
        </PopoverMU>
      </li>
    );
  }
}

export default Popover;
