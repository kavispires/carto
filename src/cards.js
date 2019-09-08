const EXPLORE_CARDS = [
  {
    number: 5,
    name: 'Temple Ruins',
    type: 'ruin',
    duration: 0,
  },
  {
    number: 6,
    name: 'Outpost Ruins',
    type: 'ruin',
    duration: 0,
  },
  {
    number: 7,
    name: 'Great River',
    type: 'explore',
    duration: 1,
  },
  {
    number: 8,
    name: 'Farmland',
    type: 'explore',
    duration: 1,
  },
  {
    number: 9,
    name: 'Hamlet',
    type: 'explore',
    duration: 1,
  },
  {
    number: 10,
    name: 'Forgotten Forest',
    type: 'explore',
    duration: 1,
  },
  {
    number: 11,
    name: 'Hinterland Stream',
    type: 'explore',
    duration: 2,
  },
  {
    number: 12,
    name: 'Homestead',
    type: 'explore',
    duration: 2,
  },
  {
    number: 13,
    name: 'Orchard',
    type: 'explore',
    duration: 2,
  },
  {
    number: 14,
    name: 'Treetop Village',
    type: 'explore',
    duration: 2,
  },
  {
    number: 15,
    name: 'Marshlands',
    type: 'explore',
    duration: 2,
  },
  {
    number: 16,
    name: 'Fishing Village',
    type: 'explore',
    duration: 2,
  },
  {
    number: 17,
    name: 'Rift Lands',
    type: 'explore',
    duration: 0,
  },
];

const AMBUSH_CARDS = [
  {
    number: 1,
    name: 'Goblin Attack',
    type: 'ambush',
    duration: 0,
  },
  {
    number: 2,
    name: 'Bugbear Assault',
    type: 'ambush',
    duration: 0,
  },
  {
    number: 3,
    name: 'Kobold Onslaught',
    type: 'ambush',
    duration: 0,
  },
  {
    number: 4,
    name: 'Gnoll Raid',
    type: 'ambush',
    duration: 0,
  },
];

const SEASON_CARDS = [
  {
    number: 18,
    name: 'Spring',
    scores: ['A', 'B'],
    duration: 8,
  },
  {
    number: 19,
    name: 'Summer',
    scores: ['B', 'C'],
    duration: 8,
  },
  {
    number: 20,
    name: 'Fall',
    scores: ['C', 'D'],
    duration: 7,
  },
  {
    number: 21,
    name: 'Winter',
    scores: ['D', 'A'],
    duration: 6,
  },
];

const GOAL_CARDS = [
  {
    number: 26,
    name: 'Sentinel Wood',
    type: 'forests',
    effect: '1 point for each forest space adjacent to the edge of the map',
  },
  {
    number: 27,
    name: 'Greenbough',
    type: 'forests',
    effect:
      '1 point per column or row with at least one forest space (both column and row score)',
  },
  {
    number: 28,
    name: 'Treetower',
    type: 'forests',
    effect:
      '1 point per forest space with all four spaces surrounded by filled spaces',
  },
  {
    number: 29,
    name: 'Sentinel Wood',
    type: 'forests',
    effect:
      '3 points for each mountain connected by a cluster of forest spaces',
  },
  {
    number: 30,
    name: 'Canal Lake',
    type: 'farmlands',
    effect:
      '1 point per water space adjacent to a farm space. 1 point per farm space adjacent to a water space',
  },
  {
    number: 31,
    name: 'Mages Valley',
    type: 'farmlands',
    effect:
      '2 points per water space adjacent to a mountain. 1 point per farm space adjacent to a mountain.',
  },
  {
    number: 32,
    name: 'The Golden Granary',
    type: 'farmlands',
    effect:
      '1 point per water space adjacent to a ruin space. 3 points per farm space on a ruin space',
  },
  {
    number: 33,
    name: 'Shoreside Expanse',
    type: 'farmlands',
    effect:
      '3 points per cluster of farm not adjacent to water spaces or the edge of the map. 3 points per cluster of water not adjacent to farm spaces or the edge of the map',
  },
  {
    number: 34,
    name: 'Wildholds',
    type: 'villages',
    effect: '8 points per cluster of 6 or more village spaces',
  },
  {
    number: 35,
    name: 'Great City',
    type: 'villages',
    effect:
      '1 point per village space in your largest village cluster that is not adjacent to mountain spaces',
  },
  {
    number: 36,
    name: 'Greengold Plains',
    type: 'villages',
    effect:
      '3 points for each cluster of village spaces that is adjacent to three or more different terrain types',
  },
  {
    number: 37,
    name: 'Shieldgate',
    type: 'villages',
    effect: '2 points per village space in your second largest village cluster',
  },
  {
    number: 38,
    name: 'Borderlands',
    type: 'territory',
    effect: '6 points per each completely filled row or column',
  },
  {
    number: 39,
    name: 'Last Barony',
    type: 'territory',
    effect: '3 points for each column in your largest square of filled spaces',
  },
  {
    number: 40,
    name: 'The Broken Road',
    type: 'territory',
    effect:
      '3 points for each diagonal line of filled spaces that touches that left and bottom edges of the map',
  },
  {
    number: 41,
    name: 'The Cauldrons',
    type: 'territory',
    effect:
      '1 point per empty space surrounded on all four sides by filled spaces or the edge of the map',
  },
];

const LETTER_CARDS = [
  {
    number: 22,
    letter: 'A',
  },
  {
    number: 23,
    letter: 'B',
  },
  {
    number: 24,
    letter: 'C',
  },
  {
    number: 25,
    letter: 'D',
  },
];

export default {
  EXPLORE_CARDS,
  AMBUSH_CARDS,
  SEASON_CARDS,
  GOAL_CARDS,
  LETTER_CARDS,
};
