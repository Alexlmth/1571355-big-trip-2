const mockDestinations = [
  {
    id: 1,
    name: 'Amsterdam',
    description:
      'Амстердам - город каналов, велосипедов и спокойных прогулок вдоль старых фасадов. \
      Здесь удобно за один день заглянуть в музей, выпить кофе у воды и вечером пройтись по подсвеченным мостам.',
    photos: [
      'https://loremflickr.com/248/152/amsterdam,canal?lock=34',
      'https://loremflickr.com/248/152/amsterdam,bikes?lock=23',
    ],
  },
  {
    id: 2,
    name: 'Prague',
    description:
      'Прага хороша для неспешного маршрута: утром можно подняться к Граду, днем перейти Карлов мост, \
      а вечером свернуть в узкие улицы Старого города и попробовать Бехеровку в небольшом баре.',
    photos: [
      'https://loremflickr.com/248/152/prague,bridge?lock=1',
      'https://loremflickr.com/248/152/prague,castle?lock=2',
      'https://loremflickr.com/248/152/prague,oldtown?lock=15',
    ],
  },
  {
    id: 3,
    name: 'Geneva',
    description:
      'Женева стоит у озера и отлично подходит для короткой остановки между горами и городским маршрутом. \
      Прогулка по набережной, вид на фонтан Же-До и старый центр легко складываются в насыщенный день.',
    photos: [],
  },
  {
    id: 4,
    name: 'Lisbon',
    description:
      'Лиссабон - солнечный город на холмах, где старые трамваи, смотровые площадки и запах выпечки \
      быстро задают настроение поездке. Лучше оставить время на Алфаму и закат у реки Тежу.',
    photos: [
      'https://loremflickr.com/248/152/lisbon,tram?lock=41',
    ],
  },
  {
    id: 5,
    name: 'Berlin',
    description:
      'Берлин - город с резким характером: днем здесь легко уйти в музеи и историю, \
      а вечером переключиться на уличную еду, бары и районы, где жизнь не спешит заканчиваться.',
    photos: [
      'https://loremflickr.com/248/152/berlin,brandenburg?lock=51',
      'https://loremflickr.com/248/152/berlin,street?lock=52',
      'https://loremflickr.com/248/152/berlin,museum?lock=53',
      'https://loremflickr.com/248/152/berlin,city?lock=54',
    ],
  },
];

const getDestinationsList = () => mockDestinations;

export { getDestinationsList };
