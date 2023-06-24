import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  marginBottom: 20,
  backgroundColor: '#fbfbfb',
};

export default ({ data, ticketSave, ticketPrint, openRefund, refundDoc }) => (
  <Paper style={style} className="ticket">
    <div className="row">
      <div className="col-md-10">
        <p className="persona">{`${data.name} ${data.lastName}`}</p>
      </div>
      <div className="col-md-2 hidden-xs">
        <p className="price">
          {data.price}
          <span className="currency"> ₴</span>
        </p>
      </div>
      <div className="col-md-3 col-xs-12 ticket__content">
        <div className="col-md-12 col-xs-4 ">
          <div className="time-departure">
            <span className="ticket-departure-datetime show-desktop">{data.dtDepFormated}</span>
            <div className="ticket-departure-time show-mobile">{data.timeDep}</div>
            <div className="ticket-departure-date show-mobile">{data.dateDepFormated}</div>
          </div>
        </div>
        <div className="col-md-12 col-xs-8">
          <p className="place-departure">
            {data.stDepName},<br />
            {data.stDepAddr}
          </p>
        </div>
      </div>
      <div className="col-md-2 col-xs-12">
        <div className="col-md-12 col-xs-4 ticket-arrow-div">
          <p className="trip__arrow-one showmobileb" />
          <p className="duration showdesktopb">{`${data.wayHour}ч ${data.wayMin}мин`}</p>
        </div>
        <div className="col-md-12 col-xs-8 ticket-duration-div">
          <p className="trip__arrow-one showdesktopb" />
          <p className="duration showmobileb">{`${data.wayHour}ч ${data.wayMin}мин`}</p>
        </div>
      </div>
      <div className="col-md-3 col-xs-12">
        <div className="col-md-12 col-xs-4">
          <p className="time-arrived">
            <span className="ticket-arrived-datetime show-desktop">{data.dtArrFormated}</span>
            <div className="ticket-arrived-time show-mobile">{data.timeArr}</div>
            <div className="ticket-arrived-date show-mobile">{data.dateArrFormated}</div>
          </p>
        </div>
        <div className="col-md-12 col-xs-8">
          <p className="place-arrived">
            {data.stArrName},<br />
            {data.stArrAddr}
          </p>
        </div>
      </div>
      <div className="col-md-2 col-xs-12">
        <div className="col-md-12 col-xs-4">
          <p className="sitlabel showmobileb">Место</p>
        </div>
        <div className="col-md-12 col-xs-8">
          <p className="sits">{data.place}</p>
        </div>
      </div>
      <div className="col-xs-12 visible-xs">
        <div className="col-xs-4">
          <p className="price">
            {data.price}
            <span className="currency"> ₴</span>
          </p>
        </div>
        <div className="col-md-12 col-xs-8">
          {!data.reqId ? ((data.canRefund !== 0 && new Date() < new Date(data.dtDepFormated)) ? (
            <div
              className="ticket__refund-link show-mobile"
              onClick={e =>
                openRefund(e, {
                  buyId: data.buyId,
                  ticketId: data.ticketId,
                  fio: `${data.name} ${data.lastName}`,
                })}
            >
              Вернуть билет
            </div>
          ) : null) : (
            <div className="action-btns">
              <div className="action-btns__status">
                <span className="status-download">Заявка в обработке</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-4" />
    </div>
    <div className="row">
      <div className="col-md-10 col-xs-12">
        <p className="transporter">Перевозчик: {data.carrierName}</p>
        <div className="action-btns">
          <div className="action-btns__local">
            <span data-id={data.ticketId} onClick={ticketSave}>
              Загрузить
            </span>
          </div>
          <div className="action-btns__email">
            <span>Отправить на почту</span>
          </div>
          <div className="action-btns__print show-desktop">
            <span data-id={data.buyId} onClick={ticketPrint}>
              Распечатать
            </span>
          </div>
        </div>
      </div>
      {!data.reqId ? (
        <div className="col-md-2 col-xs-12">
          <div
            className="ticket__refund-link show-desktop"
            onClick={e =>
              openRefund(e, {
                buyId: data.buyId,
                ticketId: data.ticketId,
                fio: `${data.name} ${data.lastName}`,
              })}
          >
            Вернуть билет
          </div>
        </div>
      ) : (
        <div className="col-md-2 refund-inprogress hidden-xs">
          <div className="action-btns">
            <div className="action-btns__status">
              <span className="status-download">Заявка в обработке</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </Paper>
);
