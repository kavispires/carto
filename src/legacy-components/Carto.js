import React, { Component } from 'react';
import _ from 'lodash';

// Import Data
import CARDS from './cards';
// Import Components
import Container from './Container';
import GoalsSelection from './GoalsSelection';
import Explore from './Explore';
import Season from './Season';
import Scoring from './Scoring';

const initialState = {
  tab: 'goals',
  phase: 'season',
  goals: {
    A: null,
    B: null,
    C: null,
    D: null,
  },
  goalsType: {
    A: null,
    B: null,
    C: null,
    D: null,
  },
  isGoalsReady: false,
  isGameActive: false,
  deck: [],
  ambushDeck: [],
  seasons: [],
  round: 0,
  deckIndex: -1,
  currentSeason: {},
  currentDuration: 0,
  currentCard: {},
  previousCard: {},
  usedAmbushIndexes: [],
};

class Carto extends Component {
  constructor() {
    super();
    this.state = Object.assign({}, initialState);

    this.switchTabs = this.switchTabs.bind(this);
    this.selectGoalCard = this.selectGoalCard.bind(this);
    this.selectRandomGoalCard = this.selectRandomGoalCard.bind(this);
    this.setupSeason = this.setupSeason.bind(this);
    this.startSeason = this.startSeason.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.tab === 'game' && this.state.tab !== prevState.tab && !this.state.isGameActive) {
      this.setup();
    }
  }
  switchTabs(e) {
    const id = typeof e === 'string' ? e : e.target.id;

    if (id === 'reset') {
      this.reset();
    } else if (id && this.state.tab !== id) {
      this.setState({ tab: id });
    }
  }

  reset() {
    this.setState({ ...initialState });
  }

  selectGoalCard(value, letter) {
    const goal = _.find(CARDS.GOAL_CARDS, (o) => o.number === +value);

    const goals = {
      ...this.state.goals,
      [letter]: goal,
    };

    const isGoalsReady = Object.values(goals).reduce((r, g) => (g !== null ? r : false), true);

    const goalsType = {
      ...this.state.goalsType,
      [letter]: goal.type,
    };

    this.setState({
      goals,
      goalsType,
      isGoalsReady,
    });
  }

  selectRandomGoalCard(letter) {
    const notAllowedTypes = Object.values({
      ...this.state.goalsType,
      [letter]: null,
    }).reduce((res, val) => {
      if (val) res[val] = true;
      return res;
    }, {});

    let randomGoal = null;

    while (!randomGoal) {
      randomGoal = CARDS.GOAL_CARDS[Math.floor(Math.random() * CARDS.GOAL_CARDS.length)];
      if (notAllowedTypes[randomGoal.type]) {
        randomGoal = null;
      }
    }
    this.selectGoalCard(randomGoal.number, letter);
  }

  setup() {
    this.setState({
      isGameActive: true,
      // Create deck
      deck: [...CARDS.EXPLORE_CARDS],
      // Create ambush and shuffle deck
      ambushDeck: this.shuffleDeck([...CARDS.AMBUSH_CARDS]),
      // Create seasons deck
      seasons: [...CARDS.SEASON_CARDS],
    });

    // Wait for state to be set before running setup season
    setTimeout(() => {
      this.setupSeason();
    }, 500);
  }

  setupSeason() {
    // Increase season
    const round = this.state.round + 1;
    // Reset deck index
    const deckIndex = -1;
    // Get ambush card
    const ambushDeck = [...this.state.ambushDeck];
    const ambushCard = ambushDeck.pop();
    // Get deck
    let deck = [...this.state.deck];
    // Add ambush card to deck and shuffle
    deck.push(ambushCard);
    // Remove any previously used ambush cards
    if (this.state.usedAmbushIndexes.length > 0) {
      _.pullAt(deck, this.state.usedAmbushIndexes);
    }
    // Shuffle deck
    deck = this.shuffleDeck(deck);
    // Set current season
    const currentSeason = { ...CARDS.SEASON_CARDS[round - 1] };
    this.setState({
      phase: 'season',
      round,
      deckIndex,
      ambushDeck,
      deck,
      currentSeason,
      previousCard: {},
      currentDuration: 0,
      currentCard: {},
      usedAmbushIndexes: [],
    });
  }

  startSeason() {
    this.setState({
      phase: 'explore',
    });

    setTimeout(() => {
      this.nextTurn();
    }, 500);
  }

  nextTurn() {
    // Check of season threshold
    if (
      this.state.currentDuration >= this.state.currentSeason.duration &&
      this.state.phase === 'explore'
    ) {
      this.scorePhase();
    } else {
      this.explorePhase();
    }
  }

  explorePhase() {
    // Add one to deckIndex
    const deckIndex = this.state.deckIndex + 1;
    // Revealing next card of the deck
    const currentCard = this.state.deck[deckIndex];
    // Set previous card
    const previousCard = deckIndex > 0 ? this.state.deck[deckIndex - 1] : {};

    // Calculate duration
    let currentDuration = 0;
    for (let i = 0; i <= deckIndex; i++) {
      currentDuration += this.state.deck[i].duration;
    }

    const updateObject = {
      deckIndex,
      currentDuration,
      currentCard,
      previousCard,
    };
    if (this.state.phase !== 'explore') {
      updateObject.phase = 'explore';
    }

    // If ambush, resolve and flag to remove
    if (currentCard.type === 'ambush') {
      const usedAmbushIndexes = [...this.state.usedAmbushIndexes];
      usedAmbushIndexes.push(deckIndex);
      updateObject.usedAmbushIndexes = usedAmbushIndexes;
    }

    this.setState(updateObject);

    // If ruin, call explore phase again
    if (currentCard.type === 'ruin') {
      setTimeout(() => {
        this.explorePhase();
      }, 500);
    } else {
    }
  }

  scorePhase() {
    this.setState({
      phase: 'scoring',
    });
  }

  shuffleDeck(array) {
    // Shuffle cards
    const shuffledDeck = [...array.sort(() => Math.random() - 0.5)];
    // Verify if an ambush is after a ruin and permutate their positions
    const RUINS = { 5: true, 6: true };
    const AMBUSHES = { 1: true, 2: true, 3: true, 4: true };
    let isDeckReady = false;
    while (!isDeckReady) {
      isDeckReady = true;
      for (let i = 0; i < shuffledDeck.length; i++) {
        const currentEl = shuffledDeck[i];
        const previousEl = shuffledDeck[i - 1] || {};

        if (RUINS[previousEl.number] && AMBUSHES[currentEl.number]) {
          isDeckReady = false;
          [shuffledDeck[i - 1], shuffledDeck[i]] = [shuffledDeck[i], shuffledDeck[i - 1]];
        }
      }
    }

    return shuffledDeck;
  }

  render() {
    return (
      <Container menuAction={this.switchTabs} isGoalsReady={this.state.isGoalsReady}>
        {this.state.tab === 'goals' && (
          <GoalsSelection
            selectGoalCard={this.selectGoalCard}
            selectRandomGoalCard={this.selectRandomGoalCard}
            state={this.state}
            switchTabs={this.switchTabs}
          />
        )}
        {this.state.tab === 'game' && this.state.phase === 'season' && (
          <Season state={this.state} startSeason={this.startSeason} />
        )}
        {this.state.tab === 'game' && this.state.phase === 'explore' && (
          <Explore state={this.state} nextTurn={this.nextTurn} />
        )}
        {this.state.tab === 'game' && this.state.phase === 'scoring' && (
          <Scoring state={this.state} nextTurn={this.setupSeason} />
        )}
      </Container>
    );
  }
}

export default Carto;
