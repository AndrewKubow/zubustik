import React, { Component } from 'react';
import Helmet from 'react-helmet';

class ErrorRoute extends Component {
  render() {
    return (
      <main className="error mycontainer">
        <Helmet>
          <title>Ошибка при покупки билета</title>
        </Helmet>
        <div className="container">
          <div className="col-md-12">
            <p>Оплата заказа не подтверджена</p>
            <p>Операция покупки билета будет ОТМЕНЕНА!</p>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorRoute;
