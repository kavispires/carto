import { shuffle, getRandomItems, getRandomItem } from './utils';
import CARDS from './utils/cards';
import {
  SIMPLE_GAME_GOALS,
  NORMAL_GAME_GOALS,
  PHASES,
  RIFT_LAND_ID,
  SCREENS,
} from './utils/constants';

class GameEngine {
  constructor() {
    this.shuffledDeck = shuffle(Object.values(CARDS.EXPLORE_CARDS));

    this.goals = [];
    this.deck = [];

    this.riftLands = null;

    this.monsters = null;
    this.activeMonsters = [];
    this.usedMonsters = [];

    this.skills = null;
    this.currentSeason = null;
    this.currentSeasonIndex = -1;
    this.phase = PHASES.SEASON;
    this.explorationIndex = 0;
    this.currentDuration = 0;
  }

  get previousCard() {
    return this.deck[this.explorationIndex - 1];
  }

  get currentCard() {
    return this.deck[this.explorationIndex];
  }

  get nextCard() {
    return this.deck[this.explorationIndex + 1];
  }

  get isOnRuin() {
    return this.previousCard?.type === 'ruin';
  }

  get isAmbush() {
    return this.currentCard?.type === 'ambush';
  }

  get state() {
    return {
      goals: this.goals,
      deck: this.deck,
      skills: this.skills,
      currentSeason: this.currentSeason,
      phase: this.phase,
      previousCard: this.previousCard,
      currentCard: this.currentCard,
      nextCard: this.nextCard,
      currentDuration: this.currentDuration,
      isOnRuin: this.isOnRuin,
      isAmbush: this.isAmbush,
    };
  }

  setup({ mode = 'normal', monsters = true, extraRiftLands = false, skills = false }) {
    // Define goals
    this.setupGoals(mode);

    // Add monsters
    this.monsters = monsters ? shuffle(Object.values(CARDS.AMBUSH_CARDS)) : null;

    // Add extra Rift Lands
    this.riftLands = extraRiftLands ? new Array(2).fill(CARDS.EXPLORE_CARDS[RIFT_LAND_ID]) : null;

    // Add skills
    this.skills = skills ? getRandomItems(CARDS.SKILL_CARDS, 3) : null;

    // Prepare deck
    this.setupSeason();
  }

  setupGoals(mode) {
    const goalsIndexes = mode === 'simple' ? SIMPLE_GAME_GOALS : NORMAL_GAME_GOALS;

    const forestGoal = CARDS.GOAL_CARDS[getRandomItem(goalsIndexes.forests)];
    const farmlandsGoal = CARDS.GOAL_CARDS[getRandomItem(goalsIndexes.farmlands)];
    const villagesGoal = CARDS.GOAL_CARDS[getRandomItem(goalsIndexes.villages)];
    const territoryGoal = CARDS.GOAL_CARDS[getRandomItem(goalsIndexes.territory)];

    this.goals = shuffle([forestGoal, farmlandsGoal, villagesGoal, territoryGoal]);
  }

  setupSeason() {
    this.currentSeasonIndex++;
    this.currentSeason = Object.values(CARDS.SEASON_CARDS)[this.currentSeasonIndex];
    this.currentDuration = this.currentSeason.duration;

    let newShuffledDeck = [...this.shuffledDeck];

    // Add one monster
    if (this.monsters) {
      this.activeMonsters.push(this.monsters.pop());
      newShuffledDeck = [...newShuffledDeck, ...this.activeMonsters];
    }

    // If first season and rift lands, add them
    if (this.riftLands) {
      newShuffledDeck = [...newShuffledDeck, ...this.riftLands];
    }

    // Shuffle built deck
    newShuffledDeck = shuffle(newShuffledDeck);

    const newDeck = [];

    // Prepare deck
    let duration = 0;
    let index = 0;
    while (duration < this.currentSeason.duration) {
      const card = newShuffledDeck[index];
      newDeck.push(card);
      duration += card.duration;
      index++;
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

    this.explorationIndex = this.deck[0].type === 'ruin' ? 1 : 0;

    return this.state;
  }

  startSeason() {
    this.phase = SCREENS.EXPLORE;
    this.currentDuration -= this.deck[this.explorationIndex].duration;

    return this.state;
  }

  goToPreviousCard() {
    this.explorationIndex--;
    this.currentDuration += this.deck[this.explorationIndex].duration;

    if (this.currentCard.type === 'ruin') {
      return this.goToPreviousCard();
    }

    if (this.currentCard.type === 'ambush') {
      this.activeMonsters.push(this.usedMonsters.pop());
    }

    return this.state;
  }

  goToNextCard() {
    if (this.currentDuration <= 0) {
      return this.goToScore();
    }

    if (this.currentCard.type === 'ambush') {
      // remove from active monsters
      this.activeMonsters = this.activeMonsters.reduce((acc, monsterCard) => {
        if (monsterCard.number === this.currentCard.number) {
          this.usedMonsters.push(monsterCard);
        } else {
          acc.push(monsterCard);
        }

        return acc;
      }, []);
    }

    this.explorationIndex++;
    this.currentDuration -= this.deck[this.explorationIndex].duration;

    if (this.currentCard.type === 'ruin') {
      return this.goToNextCard();
    }

    return this.state;
  }

  goToScore() {
    this.phase = SCREENS.SCORING;

    return this.state;
  }

  reset() {
    this.shuffledDeck = shuffle(Object.values(CARDS.EXPLORE_CARDS));

    this.goals = [];
    this.deck = [];

    this.riftLands = null;

    this.monsters = null;
    this.activeMonsters = [];
    this.usedMonsters = [];

    this.skills = null;
    this.currentSeason = null;
    this.currentSeasonIndex = -1;
    this.phase = PHASES.SEASON;
    this.explorationIndex = 0;
    this.currentDuration = 0;
  }
}

export default new GameEngine();
