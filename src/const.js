const POINTS_COUNT = 3;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FilterItems = [
  { type: FilterType.EVERYTHING, name: 'Everything' },
  { type: FilterType.FUTURE, name: 'Future' },
  { type: FilterType.PRESENT, name: 'Present' },
  { type: FilterType.PAST, name: 'Past' },
];

const EventTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export { POINTS_COUNT, FilterType, FilterItems, EventTypes };
