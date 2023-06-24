import React from 'react';

const getBuy = (retCond, luggCond) => (
  <div className="ticket-add-info">
    <table className="ticket-add-info-table">
      <tbody>
        <tr>
          <td colSpan="2" className="ticket-addon-header">
            К сведению пассажиров:
          </td>
        </tr>
        <tr>
          <td className="ticket-add-info-table-column">
            <ol>
              <li>
                После оплаты проезда пассажиру рекомендуется проверить все регистрационные данные,
                указанные в ваучере бронирования.
              </li>
              <li>
                Для обеспечения организованной посадки, пассажиру желательно прибыть к месту
                отправления автобуса на 20 минут раньше.
              </li>
              <li>Отправление автобуса осуществляется по местному времени.</li>
              <li>
                Пассажир несет ответственность за соблюдение визового режима и условий пересечения
                границы.
              </li>
            </ol>
          </td>
          <td className="ticket-add-info-table-column">
            <ol start="5">
              <li>
                Для получения информации о переоформлении или отмене поездки, пассажир может
                обратиться в официальные представительства компании, или по телефонам Службы
                поддержки.
              </li>
              <li>
                Оплата поездки свидетельствует о согласии пассажира с условиями договора оферты,
                размещенными на сайте и в официальных представительствах компании.
              </li>
              <li>
                Билет является действительным, только если фамилия и имя пассажира соответствуют его паспортным данным.
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td className="ticket-addon-header">
            <span>{retCond && retCond.length ? 'Условия возврата билетов:' : null}</span>
          </td>
          <td className="ticket-addon-header">
            <span>{luggCond && luggCond.length ? 'Условия перевозки багажа:' : null}</span>
          </td>
        </tr>
        <tr>
          <td className="ticket-add-info-table-column">
            <ul>
              {retCond && retCond.length
                ? retCond.map(item => <li key={Math.random()}>{item}</li>)
                : null}
            </ul>
          </td>
          <td className="ticket-add-info-table-column">
            <ul>
              {luggCond && luggCond.length
                ? luggCond.map(item => <li key={Math.random()}>{item}</li>)
                : null}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const getReserve = (retCond, luggCond) => (
  <div className="ticket-add-info">
    <table className="ticket-add-info-table">
      <tbody>
        <tr>
          <td colSpan="2" className="ticket-addon-header">
            Платежная информация:
          </td>
        </tr>
        <tr>
          <td className="ticket-add-info-table-column">
            <p className="ticket-add-info-table-column__title">Оплатить заказ можно:</p>
            <ul className="ticket-add-info-table-column__body">
              <li>в кассе любого банка по следующим реквизитам:</li>
              <ul>
                <li>ООО «БАС АЙ Т»</li>
                <li>Код получателя: ‎410041111</li>
                <li>Банк получатель: ФИЛИАЛ «РАСЧЕТНЫЙ ЦЕНТР» ПАО КБ «ПРИВАТБАНК»</li>
                <li>Код банка: 320649</li>
                <li>Номер счета: ‎26004052694106</li>
                <li>Назначение платежа: Оплата заказа №_, ФИО плательщика</li>
              </ul>
            </ul>
          </td>
          <td className="ticket-add-info-table-column">
            <ul>
              <li>при помощи сервиса Приват 24;</li>
              <li>
                через терминалы или банкоматы ПРИВАТБАНКА, по вышеуказанным реквизитам или следующим
                образом:
              </li>
              <ul>
                <li>выбрать меню «Оплата других услуг»;</li>
                <li>
                  в поле «Найти предприятие по названию»,<br />ввести поисковое слово «Зубастик 1»;
                </li>
                <li>после этого ввести сумму вашего заказа;</li>
                <li>в поле назначение платежа указать «Оплата заказа №, ФИО плательщика».</li>
              </ul>
            </ul>
          </td>
        </tr>
        <tr>
          <td className="ticket-addon-header" colSpan="2">
            <span>ОБРАЩАЕМ ВНИМАНИЕ</span>
          </td>
        </tr>
        <tr>
          <td colSpan="2" className="ticket-add-info-table-column">
            <ul>
              <li>
                не зависимо от способа оплаты, обязательно, нужно указывать номер вашего заказа, а
                также ФИО плательщика
              </li>
              <li>после получения нами оплаты, на ваш электронный адрес будет оправлен билет</li>
              <li>ваш билет будет доступен в личном кабинете на нашем сайте</li>
              <li>бланк заказа на бронирование места право проезда не дает.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Footer = ({ retCond, luggCond, reserve }) =>
  reserve ? getReserve(retCond, luggCond) : getBuy(retCond, luggCond);

export default Footer;
