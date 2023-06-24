import React from 'react';

import './seoblock.scss';

const SEOBlock = () => (
  <div className="row seo-block">
    <div className="col-md-4 text-center">
      <img src="/img/pig.png" alt="Экономим Ваши деньги." />
      <h3>Экономим Ваши деньги</h3>
      <p>
        Низкие цены на билеты,<br />без комиссий и сборов. Скидки.
      </p>
    </div>
    <div className="col-md-4 text-center">
      <img src="/img/time.png" alt="Экономим Ваше время." />
      <h3>Экономим Ваше время</h3>
      <p>
        Быстрая покупка и<br />возврат билета.
      </p>
    </div>
    <div className="col-md-4 text-center">
      <img src="/img/like.png" alt="Предлагаем удобные расписания." />
      <h3>Нам доверяют</h3>
      <p>Работаем давно и надежно.<br />10 000 довольных клиентов.</p>
    </div>
  </div>
);

export default SEOBlock;
