import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Collapse } from 'react-collapse';
import Avatar from 'material-ui/Avatar';

import './faq.scss';

const FaqNumber = ({ children, current }) => {
  const styled = {
    marginRight: 10,
  };
  const color = current == children ? '#ffffff' : '#000000';
  const backgroundColor = current == children ? '#66bb6a' : '#d7d7d7';

  return (
    <Avatar size={30} style={styled} color={color} backgroundColor={backgroundColor}>
      {children}
    </Avatar>
  );
};

class FaqRoute extends Component {
  state = {
    current: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  isShow = id => id === this.state.current;

  setShow = (e) => {
    let id = Number(e.target.parentElement.dataset.id);
    const { current } = this.state;

    if (id === current) {
      id = null;
    }

    this.setState({
      current: id,
    });
  };

  render() {
    const { current } = this.state;

    return (
      <main className="faq-page mycontainer">
        <Helmet>
          <title>Вопросы и ответы. Билеты на автобус - ZUBUSTIK.</title>
          <meta
            name="description"
            content="Дешевые билеты на автобус без посредников. Скидки. Быстрая покупка. Удобный способ оплаты. Служба поддержки. Тысячи довольных клиентов."
          />
        </Helmet>
        <div className="row">
          <div className="col-xs-12 col-md-8 col-md-offset-2">
            <h1 className="textpage-title">Вопросы и ответы</h1>
            <div onClick={this.setShow} data-id="1" className="collapse-title">
              <FaqNumber current={current}>1</FaqNumber>
              <span className={current == 1 ? 'active' : ''}>Как оплатить билет?</span>
            </div>
            <Collapse isOpened={this.isShow(1)}>
              <p className="faq-page__list faq-page__header">
                Онлайн, на сайте, при помощи платежной карты Visa или MasterCard.
              </p>
              <p className="faq-page__list">Наличными, через кассу любого банка по реквизитам:</p>
              <div className="faq-page__address">
                <b>Получатель:</b> ООО «БАС АЙ Т» <br />
                <b>Код получателя:</b> 41004111<br />
                <b>Банк получателя:</b> ФИЛИАЛ «РАСЧЕТНЫЙ ЦЕНТР» ПАТ КБ «ПРИВАТБАНК»<br />
                <b>Код банка:</b> 320649<br />
                <b>Номер счета:</b> 26004052694106
              </div>

              <p className="faq-page__list">При помощи сервиса «Приват 24»</p>
              <p className="faq-page__list faq-page__footer">
                Через терминалы или банкоматы ПРИВАТБАНКА,{' '}
                <span>
                  по вышеуказанным реквизитам или следующим образом: выбрать меню «Оплата других
                  услуг», в поле «Найти предприятие по названию», ввести поисковое слово «Зубастик
                  1», после этого ввести сумму вашего заказа, в поле назначение платежа указать
                  «Оплата заказа №, ФИО плательщика».
                  <br />
                  <b>ОБРАЩАЕМ ВНИМАНИЕ</b>, что не зависимо от способа оплаты, <b>обязательно</b>,
                  нужно указывать номер вашего заказа, а также ФИО плательщика.
                </span>
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="2" className="collapse-title">
              <FaqNumber current={current}>2</FaqNumber>
              <span className={current == 2 ? 'active' : ''}>
                Можно ли у Вас забронировать билет?
              </span>
            </div>
            <Collapse isOpened={this.isShow(2)}>
              <p className="faq-page__infoblock faq-page__center">
                На нашем сайте есть возможность бронирования мест только для зарегистрированных
                пользователей. Однако, обращаем Ваше внимание на то, что при бронировании
                установлены определенные сроки выкупа билета. В случае, если Вы выкупаете билет не
                вовремя, бронь снимается, а место становится доступным для дальнейшей продажи.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="3" className="collapse-title">
              <FaqNumber current={current}>3</FaqNumber>
              <span className={current == 3 ? 'active' : ''}>
                Как вернуть деньги за оплаченный билет и какие условия возврата?
              </span>
            </div>
            <Collapse isOpened={this.isShow(3)}>
              <p className="faq-page__infoblock faq-page__header">
                Вернуть деньги за оплаченный билет можно через личный кабинет, который создается
                после прохождения Вами регистрации на сайте.
              </p>
              <p className="faq-page__infoblock">
                В разделе «Мои билеты» нажмите на надпись «Вернуть билет», заполните данные формы и
                нажмите кнопку Отправить заявку.
              </p>
              <p className="faq-page__infoblock">
                В зависимости от способа оплаты, возврат средств будет осуществлен в кратчайшие
                сроки.
              </p>
              <p className="faq-page__infoblock faq-page__footer">
                Условия возврата устанавливаются перевозчиками индивидуально. Информация об условиях
                возврата доступна во время покупки в разделе «Подробно».
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="4" className="collapse-title">
              <FaqNumber current={current}>4</FaqNumber>
              <span className={current == 4 ? 'active' : ''}>
                Что мне дает регистрация на сайте?
              </span>
            </div>
            <Collapse isOpened={this.isShow(4)}>
              <p className="faq-page__infoblock faq-page__header">
                Регистрация на сайте не является обязательной и Вы можете без проблем, покупать
                билеты без регистрации. Однако, зарегистрированные пользователи получают
                дополнительные преимущества. Только зарегистрированные пользователи получают
                возможность осуществлять бронирование на сайте, а также участвовать в различных
                акциях и программах лояльности.
              </p>
              <p className="faq-page__infoblock faq-page__footer">
                Кроме того, через личный кабинет Вы можете получить доступ к списку своих билетов,
                которые можно скачать на диск, отправить себе на электронную почту, распечатать, а
                также осуществить их возврат.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="5" className="collapse-title">
              <FaqNumber current={current}>5</FaqNumber>
              <span className={current == 5 ? 'active' : ''}>
                Можно ли перевезти с собой домашнее животное?
              </span>
            </div>
            <Collapse isOpened={this.isShow(5)}>
              <p className="faq-page__infoblock faq-page__center">
                Вопрос перевозки домашнего животного решается в индивидуальном порядке с каждым
                перевозчиком в отдельности. Для того, чтобы уточнить возможность перевозки на том
                или ином рейсе обратитесь по телефонам службы поддержки или напишите нам на
                электронную почту. Наши сотрудники свяжутся с перевозчиком, а затем ответят на Ваш
                запрос.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="6" className="collapse-title">
              <FaqNumber current={current}>6</FaqNumber>
              <span className={current == 6 ? 'active' : ''}>Застрахована ли моя поездка?</span>
            </div>
            <Collapse isOpened={this.isShow(6)}>
              <p className="faq-page__infoblock faq-page__center">
                В соответствии с действующим законодательством страхование пассажиров является
                обязательным видом страхования для перевозчиков. Страховой платеж входит в стоимость
                проезда.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="7" className="collapse-title">
              <FaqNumber current={current}>7</FaqNumber>
              <span className={current == 7 ? 'active' : ''}>Можно ли поменять дату поездки?</span>
            </div>
            <Collapse isOpened={this.isShow(7)}>
              <p className="faq-page__infoblock faq-page__center">
                Для того, чтобы поменять дату поездки следует сначала осуществить возврат билета
                через Ваш личный кабинет (при этом, Вам будут возвращены деньги в соответствии с
                правилами возврата, установленными перевозчиком), а затем приобрести новый билет на
                нужную дату.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="8" className="collapse-title">
              <FaqNumber current={current}>8</FaqNumber>
              <span className={current == 8 ? 'active' : ''}>
                Почему я не могу выбрать конкретное место в автобусе при покупке и где я буду
                сидеть?
              </span>
            </div>
            <Collapse isOpened={this.isShow(8)}>
              <p className="faq-page__infoblock faq-page__center">
                Если при покупке билета Вам не предоставляется возможность выбора места в салоне
                автобуса – это означает, что у перевозчика на данном рейсе действует свободная
                посадка. Свободная посадка означает, что перевозчик гарантирует Вам место в
                автобусе. Однако, конкретный номер места Вам укажет водитель автобуса или стюардесса
                при посадке.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="9" className="collapse-title">
              <FaqNumber current={current}>9</FaqNumber>
              <span className={current == 9 ? 'active' : ''}>
                Какие условия для перевозки детей?
              </span>
            </div>
            <Collapse isOpened={this.isShow(9)}>
              <p className="faq-page__infoblock faq-page__center">
                Большинство перевозчиков, услуг которых реализуются на нашем сервисе предоставляют
                детям скидки на проезд. Размер скидки зависит от возраста ребенка. Его можно увидеть
                при нажатии на надпись «Подробно», на странице результатов поиска рейсов.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="10" className="collapse-title">
              <FaqNumber current={current}>10</FaqNumber>
              <span className={current == 10 ? 'active' : ''}>
                Какие условия для перевозки багажа?
              </span>
            </div>
            <Collapse isOpened={this.isShow(10)}>
              <p className="faq-page__infoblock faq-page__center">
                Условия перевозки багажа устанавливаются перевозчиками индивидуально. Получить
                информацию об этих условиях можно во время покупки билета, на странице результатов
                поиска рейсов, при нажатии на надпись «Подробно». Если в разделе «Подробно»
                отсутствует информация об условиях перевозки багажа, обратитесь за помощью в службу
                поддержки по телефонам, через мессенджер Viber или напишите нам на электронную почту{' '}
                <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="11" className="collapse-title">
              <FaqNumber current={current}>11</FaqNumber>
              <span className={current == 11 ? 'active' : ''}>
                Что делать, если мне не пришел билет на электронную почту?
              </span>
            </div>
            <Collapse isOpened={this.isShow(11)}>
              <p className="faq-page__infoblock faq-page__center">
                Обратитесь за помощью в службу поддержки по телефонам, через мессенджер Viber или
                напишите нам на электронную почту{' '}
                <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>. Наши
                сотрудники обязательно решат Вашу проблему и Вы получите билет.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="12" className="collapse-title">
              <FaqNumber current={current}>12</FaqNumber>
              <span className={current == 12 ? 'active' : ''}>
                Можно ли сесть в автобус по билету на телефоне?
              </span>
            </div>
            <Collapse isOpened={this.isShow(12)}>
              <p className="faq-page__infoblock faq-page__header">
                Осуществить посадку по билету на телефоне можно на рейсы следующих перевозчиков:
              </p>
              <p className="faq-page__infoblock">
                ООО «УШ АТП 10943», ФОП Стецик, ПП «Авто-Эксперт», ООО «Владимирецтранссервис», ФОП
                Зорин.
              </p>
              <p className="faq-page__infoblock faq-page__footer">
                Для посадки в автобус на рейсы остальных перевозчиков необходимо иметь распечатанный
                билет.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="13" className="collapse-title">
              <FaqNumber current={current}>13</FaqNumber>
              <span className={current == 13 ? 'active' : ''}>
                Можно ли забронировать билет и оплатить водителю?
              </span>
            </div>
            <Collapse isOpened={this.isShow(13)}>
              <p className="faq-page__infoblock faq-page__center">
                Такую услугу наш сервис не предоставляет. Вам необходимо выбрать подходящий рейс и
                осуществить оплату одним из предложенных нашим сервисом вариантов: банковской
                картой, через банкомат или кассу любого банка по реквизитам.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="14" className="collapse-title">
              <FaqNumber current={current}>14</FaqNumber>
              <span className={current == 14 ? 'active' : ''}>Как узнать какой будет автобус?</span>
            </div>
            <Collapse isOpened={this.isShow(14)}>
              <p className="faq-page__infoblock faq-page__center">
                Информация о марке и модели автобуса Вам будет доступна на странице результатов
                поиска рейсов, при нажатии на надписи «Подробно». Если в разделе «Подробно»
                отсутствует информация об автобусе, обратитесь за помощью в службу поддержки по
                телефонам, через мессенджер Viber или напишите нам на электронную почту
                <a href="mailto:support@zubustik.com.ua">support@zubustik.com.ua</a>.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="15" className="collapse-title">
              <FaqNumber current={current}>15</FaqNumber>
              <span className={current == 15 ? 'active' : ''}>
                Что делать, если я неправильно написал свою фамилию или имя при покупке?
              </span>
            </div>
            <Collapse isOpened={this.isShow(15)}>
              <p className="faq-page__infoblock faq-page__center">
                Обратитесь за помощью в службу поддержки по телефонам, через мессенджер Viber или
                напишите нам через контактную форму на странице «Контакты». Наши сотрудники
                обязательно решат Вашу проблему и Вы получите билет с правильными персональными
                данными.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="16" className="collapse-title">
              <FaqNumber current={current}>16</FaqNumber>
              <span className={current == 16 ? 'active' : ''}>
                Подождет ли меня автобус, если я опаздываю на отправление?
              </span>
            </div>
            <Collapse isOpened={this.isShow(16)}>
              <p className="faq-page__infoblock faq-page__center">
                Как правило, автобусы отправляются строго по расписанию, однако в случае опоздания
                Вы можете обратиться в службу поддержки. Наши сотрудники постараются Вам помочь.
                Однако, гарантировать задержку автобуса они Вам не могут. Данный вопрос является
                компетенцией перевозчика.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="17" className="collapse-title">
              <FaqNumber current={current}>17</FaqNumber>
              <span className={current == 17 ? 'active' : ''}>
                Что нужно иметь при себе при посадке в автобус?
              </span>
            </div>
            <Collapse isOpened={this.isShow(17)}>
              <p className="faq-page__infoblock faq-page__center">
                При посадке в автобус, прежде всего , нужно иметь билет. Кроме того, в случае
                осуществления международной поездки Вам необходим заграничный паспорт и другие
                документы предусмотренные законодательством.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="18" className="collapse-title">
              <FaqNumber current={current}>18</FaqNumber>
              <span className={current == 18 ? 'active' : ''}>
                Откуда будет отправляться автобус?
              </span>
            </div>
            <Collapse isOpened={this.isShow(18)}>
              <p className="faq-page__infoblock faq-page__center">
                Место отправления автобуса указано в Вашем билете. Кроме того, данную информацию Вы
                можете найти на странице результатов поиска рейсов, при нажатии на надписи
                «Подробно» на рейсе, на который Вы приобрели билет.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="19" className="collapse-title">
              <FaqNumber current={current}>19</FaqNumber>
              <span className={current == 19 ? 'active' : ''}>
                А, автобус приедет по расписанию?
              </span>
            </div>
            <Collapse isOpened={this.isShow(19)}>
              <p className="faq-page__infoblock faq-page__center">
                Как правило, перевозчики выполняют рейсы в соответствии с расписанием. Однако,
                бывают ситуации форс-мажорного характера, которые не позволяют перевозчику соблюдать
                установленный график движения автобусов. Например, задержка автобуса в связи с
                очередью транспортных средств на границе, сложные погодные условия и т.д.
              </p>
            </Collapse>
            <div onClick={this.setShow} data-id="20" className="collapse-title">
              <FaqNumber current={current}>20</FaqNumber>
              <span className={current == 20 ? 'active' : ''}>
                Что делать, если не получается оплатить банковской картой?
              </span>
            </div>
            <Collapse isOpened={this.isShow(20)}>
              <p className="faq-page__infoblock faq-page__header">
                Самыми частыми проблемами оплаты при помощи платежных карт являются:
              </p>
              <p className="faq-page__list">превышение лимита оплаты в Интернете</p>
              <p className="faq-page__list">недостаточное количество средств на счету</p>
              <p className="faq-page__list">неправильно введенные данные карты</p>
              <p className="faq-page__list">окончание срока действия карты</p>
              <p className="faq-page__infoblock faq-page__footer">
                Если, оплата не проходит по какой-то другой причине, вам следует обратиться в службу
                поддержки вашего банка.
              </p>
            </Collapse>
          </div>
        </div>
      </main>
    );
  }
}

export default FaqRoute;
