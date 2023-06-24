import React from 'react';
import PropTypes from 'prop-types';

const ListOfInfo = ({ data, type }) => (
  <ul className="content">
    {data.map((item, key) => <li key={key + type}>{item}</li>)}
  </ul>
);

const Info = ({ data, seopage }) => (
  <div>
    {data.bus ? (
      <p className="details__bus" style={seopage ? { marginTop: 0 } : {}}>
        Автобус:{' '}
      </p>
    ) : null}
    {data.bus ? <p className="content">{data.bus}</p> : null}
    {data.comfort ? <p className="details__comfort">Комфорт: </p> : null}
    {data.comfort ? <p className="content">{data.comfort}</p> : null}
    {data.discount ? <p className="details__discount">Скидки: </p> : null}
    {data.discount ? <ListOfInfo data={data.discount} type="discount" /> : null}
    {data.luggage ? <p className="details__bag">Багаж: </p> : null}
    {data.luggage ? <ListOfInfo data={data.luggage} type="luggage" /> : null}
    {data.refund ? (
      <p className="details__map">Условия возврата билета:</p>
    ) : null}
    {data.refund ? <ListOfInfo data={data.refund} type="refund" /> : null}
  </div>
);

export default Info;
