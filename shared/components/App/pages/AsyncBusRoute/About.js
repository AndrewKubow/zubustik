import React from 'react';
import PropTypes from 'prop-types';

const getContent = (content, dep, arr) => {
  const destination = `${dep} - ${arr}`;

  switch (content) {
    case 1:
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <p>
              Живя в современном мире люди находятся в постоянном в движении, совершая поездки.
              Кто-то летает самолетом, кто-то ездит поездом, но многие пассажиры предпочитают
              путешествовать на автобусе.
            </p>
            <p>
              Автобусный маршрут {destination}. ориентирован на настоящих ценителей сухопутных
              поездок и путешествий. Находясь в автобусе, следующем рейсом {destination}. Вы можете
              лицезреть прекрасные ландшафты и мечтать. Ведь именно мечты – настоящий двигатель
              прогресса.
            </p>
            <p>Вы спросите, где можно купить билеты на автобус {destination}. и за сколько?</p>
            <p>
              Купить билеты без лишней суеты Вы можете через онлайн-сервис Зубастик. Наш сервис
              разработан специально для удобной и быстрой покупки билетов по Украине, а также из
              Украины в Польшу, Россию, Беларусь, Германия, Чехию, Италию и другие страны Европы.
              Сервис по продаже автобусных билетов Зубастик это - сервис, принадлежащий
              перевозчикам. Именно поэтому у нас Вы можете купить билеты на автобус {destination}.
              по самым доступным ценам.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <p>Как узнать все подробности о нужном автобусном маршруте?</p>
            <p>
              Наш сервис имеет удобный и понятный интерфейс. Вам необходимо только указать город и
              дату отправления, а также количество пассажиров и уже через несколько секунд наша
              современная система отобразит всю необходимую информацию о рейсе: сведения о
              перевозчике, стоимость билетов, точное расписание автобусов {destination} и т.д.
            </p>
            <p>
              Воспользовавшись сервисом Зубастик Вы сможете подобрать самый подходящий для Вас рейс
              и купить билет на автобус {destination}, оплатив его удобным для Вас способом.
            </p>
            <p>
              Онлайн-сервис Зубастик – это возможность совершать поездки комфортно, безопасно, и
              доступно!
            </p>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <p>
              Успешные люди всегда стремятся двигаться вперед, поэтому путешествия – это
              неотъемлемая часть нашей жизни. Кому-то по душе летать самолетом, кому-то
              передвигаться на поезде, но самым удобным видом транспорта все же остается автобус.
            </p>
            <p>
              Для истинных ценителей автобусных маршрутов наша компания предлагает направление
              {destination}. Путешествуя на автобусе по маршруту {destination}, Вам предоставляется
              уникальная возможность погрузиться в мечты и лицезреть восхитительные пейзажи. Именно
              эти мечты можно назвать двигателем прогресса, так как человеку свойственно стремиться
              воплотить их в жизнь.
            </p>
            <p>Где можно приобрести билеты на автобус {destination} и какая их цена?</p>
            <p>
              Приобрести билеты без очередей и суматохи Вы можете с помощью нашего онлайн-сервиса
              Зубастик. Его основная задача – помочь клиентам удобно и быстро покупать билеты для
              путешествия по Украине, а также из Украины в Польшу, Россию, Беларусь, Германию,
              Чехию, Италию и другие страны Европы. Главное наше преимущество в том, что сервис
              Зубастик принадлежит перевозчикам. Благодаря этому Вы можете приобрести у нас билеты
              на автобус {destination} по самым приемлемым ценам.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <p>Где можно узнать детальную информацию о нужном автобусном маршруте?</p>
            <p>
              С нашим удобным и понятным интерфейсом Dы за считанные секунды сможете получить всю
              детальную информацию о любом маршруте. Укажите город и дату отправления, а также число
              пассажиров и, спустя несколько секунд, наша система предоставит Вам всю нужную
              информацию о маршруте {destination}: точное расписание автобусов, сведения о
              перевозчике, цену билетов и т.д.
            </p>
            <p>
              Пользуясь онлайн-сервисом Зубастик, Вы сможете выбрать наиболее удобный для Вас
              маршрут и приобрести билет на автобус {destination}, произведя оплату любым удобным
              для Вас способом.
            </p>
            <p>
              Хотите путешествовать комфортно, безопасно и по доступным ценам - онлайн-сервис
              Зубастик готов выполните все три ваших желания!
            </p>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <p>
              Движение – это жизнь! Людям постоянно приходится переезжать из-за работы, в отпуск или
              в гости в другой город, страну, регион и т.д. Кому-то привычнее передвигаться на
              поезде или летать на самолете, но по статистике, большая часть пассажиров выбирают
              автобусные поездки.
            </p>
            <p>
              Для истинных ценителей наземных поездок, онлайн-сервис Зубастик предлагает автобусный
              маршрут {destination}. Как удобно путешествовать в комфортабельном автобусе по рейсу
              {destination} и рассматривать в окно прекрасные ландшафты, которые постоянно меняются,
              чаруя своей природной красотой.
            </p>
            <p>Как купить билеты на автобус {destination} и сколько они стоят?</p>
            <p>
              Больше не придется стоять в длинной очереди за билетами на вокзале! Наш онлайн-сервис
              Зубастик заботиться о своих клиентах и предоставляет им возможность без суматохи
              приобрести билеты прямо у нас на сайте. Благодаря этому, Вы можете подобрать для себя
              удобный маршрут и одним щелчком мыши купить билеты для поездок по Украине, а также из
              Украины в Германию, Польшу, Беларусь, Россию, Чехию, Италию и другие страны Европы.
              Сервис Зубастик принадлежит перевозчикам, поэтому цены на автобус {destination} у нас
              значительно ниже, чем у наших конкурентов.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <p>Как уточнить все подробности о выбранном автобусном маршруте?</p>
            <p>
              Наш сервис не только удобный, но и функциональный. Для того чтоб узнать все
              подробности про выбранный автобусный маршрут, достаточно указать всего три параметра:
              количество пассажиров, дату и город отправления. Далее, спустя несколько секунд, у вас
              на экране отобразится вся необходимая информация о рейсе: расписание автобусов,
              подробности о перевозчике, цена билетов {destination} и т.п.
            </p>
            <p>
              С помощью сервиса Зубастик каждый наш клиент теперь может самостоятельно подобрать
              подходящий для него рейс и приобрести билет на автобус {destination}, оплатив его
              наиболее удобным для него способом.
            </p>
            <p>
              До сих пор не верите, что можно путешествовать безопасно, комфортно и по приемлемым
              ценам? С нашим онлайн-сервисом Зубастик все это не только возможно, но и доступно!
            </p>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <p>
              Людям свойственно стремиться двигаться вперед. Кто-то путешествует по работе, а кто-то
              ради новых впечатлений и знаний. В современном мире люди могут выбирать, с помощью
              какого вида транспорта преодолевать расстояния. Не смотря на то, что самолетом -
              быстрее, а поездом - удобнее, автобусные поездки являются самыми популярными среди
              пассажиров.
            </p>
            <p>
              Если вы цените всю привлекательность автобусных маршрутов, то направление
              {destination} именно для Вас. Вы сможете насладиться прекрасными пейзажами и
              погрузиться в мечты, наблюдая в окне, как изменяются восхитительные виды. Все мечты
              помогают человеку двигаться вперед, добиваться поставленных целей, что позволяет
              достичь больших успехов в жизни.
            </p>
            <p>Как я могу купить билеты на автобус {destination} и сколько они стоят?</p>
            <p>
              Если вам надоело стоять в длинной очереди, предлагаем воспользоваться услугами нашего
              онлайн-сервиса Зубастик! Главная цель сервиса - предоставить клиентам возможность
              быстро и просто покупать необходимые билеты для путешествий по Украине, а также из
              Украины в Германию, Польшу, Беларусь, Россию, Чехию, Италию и иные страны Европы.
              Благодаря тому, что сервис Зубастик принадлежит перевозчикам, Вы сможете приобрести
              билеты по самым доступным ценам.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <p>Где я могу прочитать подробную информацию о выбранном автобусном маршруте?</p>
            <p>
              Удобный и понятный интерфейс нашего сайта поможет быстро найти всю нужную информацию о
              любом направлении. Выберите дату, город отправления и количество пассажиров и вся
              информация будет сформирована за считаные секунды: сведения о перевозчике, цена на
              билеты, точное расписание автобусов и т.п.
            </p>
            <p>
              С помощью, онлайн-сервиса Зубастик, заботящегося о своих клиентах, Вы всегда сможете
              подобрать наиболее удобный маршрут и произвести оплату за билет на автобус
              {destination}, самым удобным для вас способом.
            </p>
            <p>
              Желаете путешествовать с комфортом, безопасно и по самым приемлемым ценам? Онлайн -
              сервис Зубастик сможет Вам в этом помочь!
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <p>
              Современный мир настолько заманчив и привлекателен, что удержаться от путешествий
              просто не возможно. Кому-то удобнее летать на самолете, кому-то привычнее ездить на
              поезде, но большая часть пассажиров, по прежнему отдают предпочтение поездкам на
              автобусе.
            </p>
            <p>
              Для тех, кто по-настоящему ценит сухопутные поездки и путешествия, мы предлагаем
              автобусный маршрут {destination}. Сидя в удобном кресле автобуса и наблюдая, как
              меняются за окном восхитительные ландшафты, люди погружаются в свои мечты, а именно
              они и являются настоящим двигателем прогресса.
            </p>
            <p>Интересует, где можно купить билеты на автобус {destination} и какая их цена?</p>
            <p>
              Приобрести билеты на автобус без лишней суеты Вы можете через онлайн-сервис Зубастик.
              Цель нашего сервиса – это помочь своим клиентам максимально удобно и быстро
              приобретать билеты на автобусы по Украине, а также из Украины в Польшу, Россию,
              Беларусь, Германию, Чехию, Италию и другие страны Европы. Сервис Зубастик предлагает
              билеты на автобус {destination} по самым приемлемым ценам, так как принадлежит самим
              перевозчикам.
            </p>
          </div>
          <div className="col-md-6 col-xs-12">
            <p>Как узнать всю информацию об автобусном маршруте?</p>
            <p>
              Мы постарались создать для Вас максимально удобный и понятный интерфейс. Благодаря
              этому, указав число пассажиров, город и дату отправления, Вы получаете полную
              информацию о направлении {destination}:
            </p>
            <p className="segment__list">стоимость билетов;</p>
            <p className="segment__list">сведения о перевозчике;</p>
            <p className="segment__list">точное расписание автобусов и т.д.</p>
            <p>
              Используя сервис Зубастик, Вы сможете подобрать наиболее подходящий маршрут и
              приобрести билет на автобус {destination} в удобное для Вас время, сидя за своим
              компьютером или мобильным устройством, оплатив его удобным для Вас способом.
            </p>
            <p>
              До сих пор не верите, что путешествие может быть безопасным, комфортным, а главное
              доступным? Онлайн-сервис Зубастик поможет Вам в этом убедиться!
            </p>
          </div>
        </div>
      );
  }
};

const About = ({ departureCity, arrivedCity, lowPrice }) => (
  <div className="container-fluid bus-segment__about">
    <div className="row">
      <div className="col-md-12 col-xs-12">
        <h3>
          Автобус {departureCity} - {arrivedCity}
        </h3>
      </div>
    </div>
    {getContent(parseInt(Math.random() * 10, 10), departureCity, arrivedCity)}
  </div>
);

About.propTypes = {
  departureCity: PropTypes.string.isRequired,
  arrivedCity: PropTypes.string.isRequired,
  lowPrice: PropTypes.number.isRequired,
};

export default About;
