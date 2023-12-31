import React, { Component } from 'react';
import Helmet from 'react-helmet';

import powerImg from '../../../../../public/img/power.png';
import './about.scss';

class AboutRoute extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="about-page mycontainer">
        <Helmet>
          <title>сервис продажи автобусных билетов, принадлежащий перевозчикам.</title>
          <meta
            name="description"
            content="Дешевые билеты на автобус без посредников. Скидки. Быстрая покупка. Удобный способ оплаты. Служба поддержки. Тысячи довольных клиентов."
          />
        </Helmet>
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <h1 className="textpage-title">О нас</h1>
            <p className="about-page__infoblock">
              «Зубастик» (ZUBUSTIK) – уникальный, в Украине, онлайн-сервис, напрямую принадлежащий
              группе автобусных перевозчиков, которые решили продавать свои билеты, самостоятельно,
              без посредников.
            </p>
            <p className="about-page__infoblock">
              Сервис «Зубастик» начал функционировать в 2015 году. За этот непродолжительный период
              времени мы смогли доказать более чем 10 000 клиентам свою надежность и высокое
              качество обслуживания.
            </p>
            <p className="about-page__infoblock">
              География наших рейсов покрывает Украину, Польшу, Россию, Беларусь, Германию, Чехию и
              Италию.
            </p>
            <p className="about-page__infoblock">
              «Зубастик» – это молодая, динамичная, целеустремленная команда, ориентированная на
              людей, заряженных позитивной энергией, обладающих чувством юмора и не унывающих в
              сложных ситуациях. В общем, «Зубастик» – это сервис, исповедующий идеологию оптимиста.
            </p>
            <p className="about-page__infoblock">
              Для нас «стакан всегда наполовину полный», и не как не наоборот. В тоже время, мы
              считаем необходимыми условиями для ведения нашего бизнеса ответственность,
              добропорядочность и профессионализм.
            </p>
            <h3 className="textpage-subtitle">Наша особенность</h3>
            <p className="about-page__infoblock">
              Мы предоставляем пассажирам возможность покупать автобусные билеты быстро и удобно,
              напрямую, <b>у производителя услуг, по самым справедливым ценам</b>, без агентских
              наценок и комиссий.
            </p>
            <h3 className="textpage-subtitle">Клиенты и мы</h3>
            <h5 className="textpage-focus">
              Мы заботимся о каждом своем клиенте, поэтому стараемся обеспечить:
            </h5>
            <p className="about-page__list">максимальный уровень коммуникации с клиентами;</p>
            <p className="about-page__list">удобство и надежность пользования сервисом;</p>
            <p className="about-page__list">атмосферу доверия в отношениях с клиентами.</p>
            <p className="about-page__infoblock">
              Интерфейс нашего онлайн-сервиса спроектирован таким образом, чтобы пользователь с
              любым уровнем знаний смог им воспользоваться.
            </p>
            <p className="about-page__infoblock">
              Мы стараемся предоставить вам всю необходимую информацию для принятия правильного
              решения и выбора оптимального варианта поездки.
            </p>
            <p className="about-page__infoblock">
              При возникновении любых вопросов, вы всегда можете обратиться к нам в службу поддержки
              по телефону, при помощи мессенджеров Viber или Telegram, а также электронной почты.
              Ответы на вопросы будут предоставлены максимально оперативно.
            </p>
            <p className="about-page__infoblock">
              Мы даем возможность вам купить билет в любом удобном для вас месте, в любое удобное
              для вас время. У вас нет необходимости ездить на автовокзал и стоять в очереди. Это
              время вы можете потратить с пользой для себя и своих близких.
            </p>

            <img
              className="img-responsive"
              src={powerImg}
              alt="(Зубастик) моя сила - честные цены на автобусные билеты"
              height="723"
              width="1446"
            />
          </div>
        </div>
      </main>
    );
  }
}

export default AboutRoute;
