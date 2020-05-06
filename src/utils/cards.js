const AMBUSH_CARDS = {
  1: {
    number: 1,
    name: 'Goblin Attack',
    type: 'ambush',
    duration: 0,
  },
  2: {
    number: 2,
    name: 'Bugbear Assault',
    type: 'ambush',
    duration: 0,
  },
  3: {
    number: 3,
    name: 'Kobold Onslaught',
    type: 'ambush',
    duration: 0,
  },
  4: {
    number: 4,
    name: 'Gnoll Raid',
    type: 'ambush',
    duration: 0,
  },
};

const EXPLORE_CARDS = {
  5: {
    number: 5,
    name: 'Temple Ruins',
    type: 'ruin',
    duration: 0,
  },
  6: {
    number: 6,
    name: 'Outpost Ruins',
    type: 'ruin',
    duration: 0,
  },
  7: {
    number: 7,
    name: 'Great River',
    type: 'explore',
    duration: 1,
  },
  8: {
    number: 8,
    name: 'Farmland',
    type: 'explore',
    duration: 1,
  },
  9: {
    number: 9,
    name: 'Hamlet',
    type: 'explore',
    duration: 1,
  },
  10: {
    number: 10,
    name: 'Forgotten Forest',
    type: 'explore',
    duration: 1,
  },
  11: {
    number: 11,
    name: 'Hinterland Stream',
    type: 'explore',
    duration: 2,
  },
  12: {
    number: 12,
    name: 'Homestead',
    type: 'explore',
    duration: 2,
  },
  13: {
    number: 13,
    name: 'Orchard',
    type: 'explore',
    duration: 2,
  },
  14: {
    number: 14,
    name: 'Treetop Village',
    type: 'explore',
    duration: 2,
  },
  15: {
    number: 15,
    name: 'Marshlands',
    type: 'explore',
    duration: 2,
  },
  16: {
    number: 16,
    name: 'Fishing Village',
    type: 'explore',
    duration: 2,
  },
  17: {
    number: 17,
    name: 'Rift Lands',
    type: 'explore',
    duration: 0,
  },
};

const EDICT_CARDS = [
  {
    number: 22,
    letter: 'A',
    index: 0,
  },
  {
    number: 23,
    letter: 'B',
    index: 1,
  },
  {
    number: 24,
    letter: 'C',
    index: 2,
  },
  {
    number: 25,
    letter: 'D',
    index: 3,
  },
];

const SEASON_CARDS = {
  18: {
    number: 18,
    name: 'Spring',
    scores: [EDICT_CARDS[0], EDICT_CARDS[1]],
    duration: 8,
  },
  19: {
    number: 19,
    name: 'Summer',
    scores: [EDICT_CARDS[1], EDICT_CARDS[2]],
    duration: 8,
  },
  20: {
    number: 20,
    name: 'Fall',
    scores: [EDICT_CARDS[2], EDICT_CARDS[3]],
    duration: 7,
  },
  21: {
    number: 21,
    name: 'Winter',
    scores: [EDICT_CARDS[3], EDICT_CARDS[0]],
    duration: 6,
  },
};

const GOAL_CARDS = {
  26: {
    number: 26,
    name: 'Sentinel Wood',
    type: 'forests',
    effect: '1 point for each forest space adjacent to the edge of the map.',
  },
  27: {
    number: 27,
    name: 'Greenbough',
    type: 'forests',
    effect: '1 point per column or row with at least one forest space (both column and row score).',
  },
  28: {
    number: 28,
    name: 'Treetower',
    type: 'forests',
    effect: '1 point per forest space with all four sides surrounded by filled spaces.',
  },
  29: {
    number: 29,
    name: 'Sentinel Wood',
    type: 'forests',
    effect: '3 points for each mountain connected by a cluster of forest spaces.',
  },
  30: {
    number: 30,
    name: 'Canal Lake',
    type: 'farmlands',
    effect:
      '1 point per water space adjacent to a farm space.\n 1 point per farm space adjacent to a water space.',
  },
  31: {
    number: 31,
    name: 'Mages Valley',
    type: 'farmlands',
    effect:
      '2 points per water space adjacent to a mountain.\n 1 point per farm space adjacent to a mountain.',
  },
  32: {
    number: 32,
    name: 'The Golden Granary',
    type: 'farmlands',
    effect:
      '1 point per water space adjacent to a ruin space.\n 3 points per farm space on a ruin space',
  },
  33: {
    number: 33,
    name: 'Shoreside Expanse',
    type: 'farmlands',
    effect:
      '3 points per cluster of farm not adjacent to water spaces or the edge of the map.\n 3 points per cluster of water not adjacent to farm spaces or the edge of the map.',
  },
  34: {
    number: 34,
    name: 'Wildholds',
    type: 'villages',
    effect: '8 points per cluster of 6 or more village spaces.',
  },
  35: {
    number: 35,
    name: 'Great City',
    type: 'villages',
    effect:
      '1 point per village space in your largest village cluster that is not adjacent to mountain spaces.',
  },
  36: {
    number: 36,
    name: 'Greengold Plains',
    type: 'villages',
    effect:
      '3 points for each cluster of village spaces that is adjacent to three or more different terrain types.',
  },
  37: {
    number: 37,
    name: 'Shieldgate',
    type: 'villages',
    effect: '2 points per village space in your second largest village cluster.',
  },
  38: {
    number: 38,
    name: 'Borderlands',
    type: 'territory',
    effect: '6 points per each completely filled row or column.',
  },
  39: {
    number: 39,
    name: 'Last Barony',
    type: 'territory',
    effect: '3 points for each column in your largest square of filled spaces.',
  },
  40: {
    number: 40,
    name: 'The Broken Road',
    type: 'territory',
    effect:
      '3 points for each diagonal line of filled spaces that touches that left and bottom edges of the map.',
  },
  41: {
    number: 41,
    name: 'The Cauldrons',
    type: 'territory',
    effect:
      '1 point per empty space surrounded on all four sides by filled spaces or the edge of the map.',
  },
};

const SKILL_CARDS = {
  51: {
    number: 51,
    name: 'Acrobatics',
    cost: 2,
    text:
      'During the Draw Phase, if an ambush card is revealed, the shape drawn on your map sheet is a 2x1 shape instead of the depicted shape.',
  },
  52: {
    number: 52,
    name: 'Concentrate',
    cost: 3,
    text:
      'During the Draw Phase, if an ambush card is revealed, draw the chosen shape a second time. Fill it with the same terrain type.',
  },
  53: {
    number: 53,
    name: 'Cure Wounds',
    cost: 1,
    text:
      'During the Draw Phase, draw an additional 2x1 shape adjacent to a monster space. Fill it with an available terrain type.',
  },
  54: {
    number: 54,
    name: 'Diplomacy',
    cost: 1,
    text:
      'At any time, draw a 1x1 square and fill it with both farm terrain and village terrain types',
  },
  55: {
    number: 55,
    name: 'Knowledge',
    cost: 0,
    text:
      'During the Draw Phase, fill the chosen shape with village terrain instead of an available terrain type.',
  },
  56: {
    number: 56,
    name: 'Move Silently',
    cost: 0,
    text:
      'During the Draw Phase, draw the chosen shape so that it overhangs the edge of the map. Do not draw any portions that overhang.',
  },
  57: {
    number: 57,
    name: 'Negotiate',
    cost: 1,
    text: 'During the Draw Phase, draw a 2x2 shape instead of one of the available shapes.',
  },
  58: {
    number: 58,
    name: 'Search',
    cost: 0,
    text:
      'During the Draw Phase, draw an additional 1x1 square adjacent to the drawn shape. Fill it with the same terrain type.',
  },
};

export default {
  EXPLORE_CARDS,
  AMBUSH_CARDS,
  SEASON_CARDS,
  GOAL_CARDS,
  EDICT_CARDS,
  SKILL_CARDS,
};
