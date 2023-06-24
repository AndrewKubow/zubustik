import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './sale.scss';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class SaleWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }

    setTimeout(() => {
      if (typeof window === 'object' && /sale/.test(window.location.pathname)) {
        return true;
      }
      this.setState({
        open: true,
      });
    }, 5000);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <Dialog
        actions={<Link to="/sale" className="sale__button" onClick={this.handleClose}>Подробней</Link>}
        bodyClassName="sale__content"
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        contentStyle={{width: 300}}
      >
        Билеты в Польшу за 100 грн.
      </Dialog>
    );
  }
}
