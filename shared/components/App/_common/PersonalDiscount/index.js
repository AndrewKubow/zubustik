import React from 'react';
import Avatar from 'material-ui/Avatar';

import './discount.scss';

const style = {
  margin: 5,
};

const Discounts = () => (
  <div className="personal-discount">
    <div className="row">
      <div className="col-md-6">
        <p className="discaunt-total">Сейчас ваша скидка составляет <span>2%</span></p>
        <p className="text">Для того, что бы увеличить скидку.</p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
    <div className="row">
      <div className="col-md-1">
        <Avatar color={'#000000'} backgroundColor={'#d7d7d7'} size={44} style={style}>
          1
        </Avatar>
      </div>
      <div className="col-md-5">
        <p>Вже давно відомо, що читабельний зміст буде заважати<br />
        зосередитись людині, яка оцінює композицію сторінки.<br />
        Сенс використання Lorem Ipsum полягає в тому, що цей<br />
        текст має більш-менш нормальне розподілення літер на<br />
        відміну від, наприклад, Тут іде текст. Тут іде текст.<br />
        </p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
    <div className="row">
      <div className="col-md-1">
        <Avatar color={'#000000'} backgroundColor={'#d7d7d7'} size={44} style={style}>
          2
        </Avatar>
      </div>
      <div className="col-md-5">
        <p>Вже давно відомо, що читабельний зміст буде заважати<br />
        зосередитись людині, яка оцінює композицію сторінки.<br />
        Сенс використання Lorem Ipsum полягає в тому, що цей<br />
        текст має більш-менш нормальне розподілення літер на<br />
        відміну від, наприклад, Тут іде текст. Тут іде текст.<br />
        </p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <p className="condition">Также вы можете получить скидку при</p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
    <div className="row">
      <div className="col-md-1">
        <Avatar color={'#000000'} backgroundColor={'#d7d7d7'} size={44} style={style}>
          1
        </Avatar>
      </div>
      <div className="col-md-5">
        <p>Вже давно відомо, що читабельний зміст буде заважати<br />
        зосередитись людині, яка оцінює композицію сторінки.<br />
        Сенс використання Lorem Ipsum полягає в тому, що цей<br />
        текст має більш-менш нормальне розподілення літер на<br />
        відміну від, наприклад, Тут іде текст. Тут іде текст.<br />
        </p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
    <div className="row">
      <div className="col-md-1">
        <Avatar color={'#000000'} backgroundColor={'#d7d7d7'} size={44} style={style}>
          2
        </Avatar>
      </div>
      <div className="col-md-5">
        <p>Вже давно відомо, що читабельний зміст буде заважати<br />
        зосередитись людині, яка оцінює композицію сторінки.<br />
        Сенс використання Lorem Ipsum полягає в тому, що цей<br />
        текст має більш-менш нормальне розподілення літер на<br />
        відміну від, наприклад, Тут іде текст. Тут іде текст.<br />
        </p>
      </div>
      <div className="col-md-6">
        &nbsp;
      </div>
    </div>
  </div>
);

export default Discounts;
