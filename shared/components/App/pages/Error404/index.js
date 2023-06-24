import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './notfound.scss';

class Error404 extends Component {
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.missed = true;
    }
  }

  render() {
    return (
      <main className="notfound mycontainer">
        <div className="inner">
          <h1>404</h1>
          <h2>Данная страница не найдена.</h2>
        </div>
      </main>
    );
  }
}

Error404.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  staticContext: PropTypes.object,
};

Error404.defaultProps = {
  staticContext: {},
};

export default Error404;
