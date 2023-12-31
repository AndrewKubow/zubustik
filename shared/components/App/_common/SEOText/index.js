import React from 'react';

import './seotext.scss';

const SEOText = ({ price }) => (
  <div className="row seo-text">
    <div className="col-md-4 text-center">
      <img src="/img/pig.png" alt="Экономим Ваши деньги." height="88" />
      <h3>Лучшая цена</h3>
      <p>
        Это автобус-лоукост –<br /> билеты по цене от {price} гривен!<br />
        Накопительная система скидок<br /> и гибкие тарифы обеспечивают<br />
        самое выгодное предложение<br /> в этом направлении.
      </p>
    </div>
    <div className="col-md-4 text-center">
      <img src="/img/time.png" alt="Экономим Ваше время." height="88" />
      <h3>Экономим Ваше время</h3>
      <p>
        Удобное расписание без пересадок<br /> создано таким образом, чтобы вам<br />
        было комфортно путешествовать.<br /> Остановки на брендовых заправках<br />
        позволят вам вкусно перекусить<br /> и освежиться в пути.
      </p>
    </div>
    <div className="col-md-4 text-center">
      <img
        src="/img/like.png"
        alt="Предлагаем удобные расписания."
        height="88"
      />
      <h3>Комфортно и безопасно</h3>
      <p>
        Современные и комфорта -<br /> бельные автобусы вместе <br />с опытными
        и вежливыми водителями<br /> сделают вашу поездку лёгкой и приятной.<br />
        В автобусах есть интернет, телевизоры,<br /> работает кондиционер и есть
        пледы.
      </p>
    </div>
  </div>
);

export default SEOText;
