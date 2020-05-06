import { shuffle, getRandomItems, getRandomItem } from './utils';
import cards from './utils/cards';
import {
  SIMPLE_GAME_GOALS,
  NORMAL_GAME_GOALS,
  PHASES,
  RIFT_LAND_ID,
  SEASONS,
  SEASONS_DURATION,
} from './utils/constants';

class GameEngine {
  constructor() {
    this.shuffledDeck = shuffle(Object.values(cards.EXPLORE_CARDS));
    this.goals = [];
    this.deck = [];
    this.riftLands = null;
    this.monsters = null;
    this.usedMonsters = null;
    this.skills = null;
    this.currentSeason = null;
    this.currentSeasonIndex = -1;
    this.phase = PHASES.SEASON;
  }

  get state() {
    return {
      goals: this.goals,
      deck: this.deck,
      skills: this.skills,
      currentSeason: this.currentSeason,
      phase: this.phase,
    };
  }

  setup({ mode = 'normal', monsters = true, extraRiftLands = false, skills = false }) {
    // Define goals
    this.setupGoals(mode);

    // Add monsters
    this.monsters = monsters ? shuffle(Object.values(cards.AMBUSH_CARDS)) : null;

    // Add extra Rift Lands
    this.riftLands = extraRiftLands ? new Array(2).fill(cards.EXPLORE_CARDS[RIFT_LAND_ID]) : null;

    // Add skills
    this.skills = skills ? getRandomItems(cards.SKILL_CARDS, 3) : null;

    // Prepare deck
    this.setupSeason();
  }

  setupGoals(mode) {
    const goalsIndexes = mode === 'simple' ? SIMPLE_GAME_GOALS : NORMAL_GAME_GOALS;

    const forestGoal = cards.GOAL_CARDS[getRandomItem(goalsIndexes.forests)];
    const farmlandsGoal = cards.GOAL_CARDS[getRandomItem(goalsIndexes.farmlands)];
    const villagesGoal = cards.GOAL_CARDS[getRandomItem(goalsIndexes.villages)];
    const territoryGoal = cards.GOAL_CARDS[getRandomItem(goalsIndexes.territory)];

    this.goals = shuffle([forestGoal, farmlandsGoal, villagesGoal, territoryGoal]);
  }

  setupSeason() {
    this.currentSeasonIndex++;
    this.currentSeason = SEASONS[this.currentSeasonIndex];

    let newDeck = [];

    // If first season and rift lands, add them
    if (this.currentSeasonIndex === 'SPRING' && this.riftLands) {
      newDeck = [...this.riftLands];
    }

    // Prepare deck
    let duration = 0;
    let index = 0;
    while (duration < SEASONS_DURATION[this.currentSeason]) {
      const card = this.shuffledDeck[index];
      newDeck.push(card);
      duration += card.duration;
      index++;
    }

    // Add one monster
    if (this.monsters) {
      newDeck.push(this.monsters.pop());
    }

    this.deck = shuffle(newDeck);

    // Swap monsters if coming after ruin, if used also remove it
    const AMBUSHES = { 1: true, 2: true, 3: true, 4: true };
    const RUINS = { 5: true, 6: true };

    let isDeckReady = false;

    while (!isDeckReady) {
      isDeckReady = true;
      for (let i = 0; i < this.deck.length; i++) {
        const currentEl = this.deck[i];
        const previousEl = this.deck[i - 1] || {};

        if (RUINS[previousEl.number] && AMBUSHES[currentEl.number]) {
          isDeckReady = false;
          [this.deck[i - 1], this.deck[i]] = [this.deck[i], this.deck[i - 1]];
        }
      }
    }
  }

  nextCard() {}

  reset() {
    this.shuffledDeck = shuffle(Object.values(cards.EXPLORE_CARDS));
    this.goals = [];
    this.deck = [];
    this.riftLands = null;
    this.monsters = null;
    this.usedMonsters = null;
    this.skills = null;
    this.currentSeason = null;
    this.currentSeasonIndex = -1;
    this.phase = PHASES.EXPLORE;
  }
}

export default new GameEngine();
