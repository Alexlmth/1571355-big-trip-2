const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Заказать такси заранее',
        price: 35,
      },
      {
        id: 2,
        title: 'Выбрать комфортный салон',
        price: 20,
      },
      {
        id: 3,
        title: 'Добавить детское кресло',
        price: 15,
      },
      {
        id: 4,
        title: 'Попросить водителя встретить у выхода',
        price: 25,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 5,
        title: 'Забронировать место у окна',
        price: 12,
      },
      {
        id: 6,
        title: 'Подключить Wi-Fi в дороге',
        price: 8,
      },
      {
        id: 7,
        title: 'Посадка без очереди',
        price: 14,
      },
      {
        id: 8,
        title: 'Больше места для ног',
        price: 18,
      },
      {
        id: 9,
        title: 'Обед во время остановки',
        price: 22,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 10,
        title: 'Место с розеткой',
        price: 7,
      },
      {
        id: 11,
        title: 'Столик в вагоне-ресторане',
        price: 30,
      },
      {
        id: 12,
        title: 'Купе для ночной поездки',
        price: 95,
      },
      {
        id: 13,
        title: 'Провоз велосипеда',
        price: 24,
      },
      {
        id: 14,
        title: 'Место в тихой зоне',
        price: 18,
      },
      {
        id: 15,
        title: 'Билет с гибким временем отправления',
        price: 40,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 16,
        title: 'Доступ в бизнес-зал',
        price: 80,
      },
      {
        id: 17,
        title: 'Дополнительный багаж',
        price: 55,
      },
      {
        id: 18,
        title: 'Быстрый проход контроля',
        price: 35,
      },
      {
        id: 19,
        title: 'Приоритетная регистрация',
        price: 28,
      },
      {
        id: 20,
        title: 'Место с увеличенным пространством',
        price: 65,
      },
      {
        id: 21,
        title: 'Выбор места у окна',
        price: 18,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 22,
        title: 'Трансфер из аэропорта',
        price: 45,
      },
      {
        id: 23,
        title: 'Раннее заселение',
        price: 35,
      },
      {
        id: 24,
        title: 'Номер классом выше',
        price: 120,
      },
      {
        id: 25,
        title: 'Поздний выезд',
        price: 40,
      },
      {
        id: 26,
        title: 'Завтрак в номер',
        price: 28,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 27,
        title: 'Навигатор с готовым маршрутом',
        price: 18,
      },
      {
        id: 28,
        title: 'Видеорегистратор в аренду',
        price: 16,
      },
      {
        id: 29,
        title: 'Помощь на дороге',
        price: 25,
      },
      {
        id: 30,
        title: 'Детское кресло',
        price: 12,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 31,
        title: 'Столик рядом с живой музыкой',
        price: 20,
      },
      {
        id: 32,
        title: 'Винное сопровождение',
        price: 50,
      },
      {
        id: 33,
        title: 'Предзаказ блюд',
        price: 15,
      },
      {
        id: 34,
        title: 'Отдельный зал для компании',
        price: 90,
      },
      {
        id: 35,
        title: 'Десерт к празднику',
        price: 12,
      },
      {
        id: 36,
        title: 'Дегустационный сет от шефа',
        price: 65,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 37,
        title: 'Напитки без ограничений',
        price: 45,
      },
      {
        id: 38,
        title: 'Каюта классом выше',
        price: 110,
      },
      {
        id: 39,
        title: 'Спа-пакет на борту',
        price: 70,
      },
      {
        id: 40,
        title: 'Место на верхней палубе',
        price: 35,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
];

const getOffersList = () => mockOffers;

export { getOffersList };
