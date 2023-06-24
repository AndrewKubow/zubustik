import React from 'react';

const Ticket = ({ ticket, common }) => {
  const {
    raceName,
    dateDep,
    dateArr,
    timeDep,
    timeArr,
    fio,
    place,
    carrierName,
    passagePrice,
    price,
    discType,
    discount,
    insurName,
    insurString,
    insurAddr,
    stArrName,
    stDepName,
    luggagePrice,
    ticketNum,
  } = ticket;
  const { dateSold, timeSold, sum, orderNum, dateRes, timeRes, reserve } = common;

  return (
    <div className="ticket-border">
      {reserve ? (
        <span className="ticket-title-font ticket-blank-header">
          БЛАНК ЗАКАЗА НА БРОНИРОВАНИЕ МЕСТА
        </span>
      ) : null}
      <table className="ticket-table" cellSpacing="0" cellPadding="0">
        <colgroup />
        <tbody>
          <tr>
            <td className="ticket-logo">
              <img src="/img/zu_logo.png" width="90%" alt="" />
            </td>
            <td className="ticket-separator-rt">
              <div className="ticket-separator-top">
                <img src="/img/ticket_top_circle.png" alt="" />
              </div>
            </td>
            <td className="ticket-table-wrap-common-info">
              <span className="ticket-title-font">Рейс</span>
              <span className="ticket-title-font-eng-inline">Flight</span>
              <span className="ticket-info-font">{raceName}</span>
            </td>
            <td className="ticket-column-space" />
            <td className="ticket-table-wrap-common-info">
              <span className="ticket-title-font">Отправление</span>
              <span className="ticket-title-font-eng-inline">Departure</span>
              <span className="ticket-info-font">
                {dateDep} / {timeDep}
              </span>
              <span className="ticket-info-font">{stDepName}</span>
            </td>
            <td className="ticket-column-space" />
            <td className="ticket-table-wrap-common-info">
              <span className="ticket-title-font">Прибытие</span>
              <span className="ticket-title-font-eng-inline">Arrival</span>
              <span className="ticket-info-font">
                {dateArr} / {timeArr}
              </span>
              <span className="ticket-info-font">{stArrName}</span>
            </td>
            <td className="ticket-column-space" />
          </tr>
          <tr>
            {reserve ? (
              <td className="ticket-first-column-reserve">
                <span className="ticket-title-font">Заказано</span>
                <span className="ticket-title-font-eng-inline">Ordered</span>
                <span className="ticket-info-font">
                  {dateSold} {timeSold}
                </span>
                <span className="ticket-title-font">Бронь до</span>
                <span className="ticket-title-font-eng-inline">Pay up</span>
                <span className="ticket-info-font">
                  {dateRes} {timeRes}
                </span>
              </td>
            ) : (
              <td className="ticket-first-column">
                <span className="ticket-title-font">Продано</span>
                <span className="ticket-title-font-eng-inline">Sales</span>
                <span className="ticket-info-font">
                  {dateSold} {timeSold}
                </span>
              </td>
            )}
            <td className="ticket-separator" />
            <td className="ticket-table-wrap-common-info2">
              <span className="ticket-title-font">Пассажир</span>
              <span className="ticket-title-font-eng-inline">Passenger</span>
              <span className="ticket-info-font">{fio}</span>
            </td>
            <td className="ticket-column-space" />
            <td className="ticket-table-wrap-common-info2">
              <span className="ticket-title-font">Место</span>
              <span className="ticket-title-font-eng-inline">Seat</span>
              <span className="ticket-info-font">{place}</span>
            </td>
            <td className="ticket-column-space" />
            <td className="ticket-table-wrap-common-info2">
              <span className="ticket-title-font">Перевозчик</span>
              <span className="ticket-title-font-eng-inline">Carrier</span>
              <span className="ticket-info-font">{carrierName}</span>
            </td>
            <td className="ticket-column-space" />
          </tr>
          <tr>
            <td className="ticket-first-column ticket-last-row">
              <div className="ticket-site">
                <a href="/">
                  <i>zubustik.ua</i>
                </a>
              </div>
              <img src="/img/zu_qrcode.png" alt="" />
              <span className="ticket-number">№ {reserve ? orderNum : ticketNum}</span>
            </td>
            <td className="ticket-separator-rb">
              <div className="ticket-separator-bottom">
                <img src="/img/ticket_bottom-circle.png" alt="" />
              </div>
            </td>
            <td colSpan="6" className="ticket-table-wrap">
              <table cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr>
                    <td className="ticket-bottom-border ticket-money-first-column" />
                    <td className="ticket-bottom-border ticket-money">
                      <span className="ticket-title-font">Проезд</span>
                      <span className="ticket-title-font-eng-wrap">Passage</span>
                      <span className="ticket-info-font">{passagePrice}</span>
                    </td>
                    <td className="ticket-column-space ticket-bottom-border" />
                    <td className="ticket-bottom-border ticket-money">
                      <span className="ticket-title-font">Багаж</span>
                      <span className="ticket-title-font-eng-wrap">Luggage</span>
                      <span className="ticket-info-font">{luggagePrice}</span>
                    </td>
                    <td className="ticket-column-space ticket-bottom-border" />
                    <td className="ticket-bottom-border ticket-money">
                      <span className="ticket-title-font">Тип</span>
                      <span className="ticket-title-font-eng-wrap">Type</span>
                      <span className="ticket-info-font">{discType}</span>
                    </td>
                    <td className="ticket-column-space ticket-bottom-border" />
                    <td className="ticket-bottom-border ticket-money">
                      <span className="ticket-title-font">Скидка</span>
                      <span className="ticket-title-font-eng-wrap">Discount</span>
                      <span className="ticket-info-font">{discount}</span>
                    </td>
                    <td className="ticket-column-space ticket-bottom-border" />
                    <td className="ticket-bottom-border ticket-money">
                      <span className="ticket-title-font">Всего, грн</span>
                      <span className="ticket-title-font-eng-wrap">Total, UAH</span>
                      <span className="ticket-total-price">{price}</span>
                    </td>
                    <td className="ticket-column-space" />
                  </tr>
                  <tr>
                    {insurString ? (
                      <td colSpan="4" className="ticket-footer">
                        <span className="ticket-title-font">Страховка</span>
                        <span className="ticket-title-font-eng-inline">Insurance</span>
                        <span className="ticket-info-font">{insurString}</span>
                        <span className="ticket-info-font">{`${insurName}, ${insurAddr}`}</span>
                      </td>
                    ) : (
                      <td colSpan="4" className="ticket-footer" />
                    )}
                    <td className="ticket-column-space" />
                    <td colSpan="5" className="ticket-footer">
                      <span className="ticket-title-font">Служба поддержки</span>
                      <span className="ticket-title-font-eng-inline">Support service</span>

                      <div className="ticket-phones">
                        <span>+38-099-440-66-22</span>
                        <span>+38-097-440-66-22</span>
                      </div>

                      <div className="ticket-phones">
                        <span>+38-093-440-66-22</span>
                        <span>+38-044-222-82-00</span>
                      </div>
                    </td>
                    <td className="ticket-column-space" />
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ticket;
