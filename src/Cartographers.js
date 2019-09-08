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

class Cartographers extends Component {
  constructor() {
    super();
    this.state = {
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
    };

    this.switchTabs = this.switchTabs.bind(this);
    this.selectGoalCard = this.selectGoalCard.bind(this);
    this.selectRandomGoalCard = this.selectRandomGoalCard.bind(this);
    this.setupSeason = this.setupSeason.bind(this);
    this.startSeason = this.startSeason.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.tab === 'game' &&
      this.state.tab !== prevState.tab &&
      !this.state.isGameActive
    ) {
      console.log('%cTHIS IS HAPPENING', 'background:yellow');
      this.setup();
    }
  }

  switchTabs(e) {
    console.log('%c-switchTabs', 'background:green;color:white');
    const id = typeof e === 'string' ? e : e.target.id;

    if (id && this.state.tab !== id) {
      this.setState({ tab: id });
    }
  }

  selectGoalCard(value, letter) {
    console.log('%c-selectGoalCard', 'background:green;color:white');
    const goal = _.find(CARDS.GOAL_CARDS, o => o.number === +value);

    const goals = {
      ...this.state.goals,
      [letter]: goal,
    };

    const isGoalsReady = Object.values(goals).reduce(
      (r, g) => (g !== null ? r : false),
      true
    );

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
    console.log('%c-selectRandomGoalCard', 'background:green;color:white');
    const notAllowedTypes = Object.values({
      ...this.state.goalsType,
      [letter]: null,
    }).reduce((res, val) => {
      if (val) res[val] = true;
      return res;
    }, {});

    let randomGoal = null;

    while (!randomGoal) {
      randomGoal =
        CARDS.GOAL_CARDS[Math.floor(Math.random() * CARDS.GOAL_CARDS.length)];
      if (notAllowedTypes[randomGoal.type]) {
        randomGoal = null;
      }
    }
    this.selectGoalCard(randomGoal.number, letter);
  }

  setup() {
    console.log('%c-setup', 'background:green;color:white');
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
    console.log('%c-setupSeason', 'background:blue;color:white');
    console.log(this.state);
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
    });
  }

  startSeason() {
    console.log('%c-startSeason', 'background:cyan;color:white');
    this.setState({
      phase: 'explore',
    });

    setTimeout(() => {
      this.nextTurn();
    }, 500);
  }

  nextTurn() {
    console.log('%c-nextTurn', 'background:orange;color:white');
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
    console.log('%c-explorePhase', 'background:green;color:white');
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
    if (this.state.phase !== 'explore') updateObject.phase = 'explore';
    this.setState(updateObject);

    // TO-DO: If ambush, resolve and flag to remove

    // If ruin, call explore phase again
    if (currentCard.type === 'ruin') {
      console.log('%cRUIN', 'background:brown', currentCard);
      setTimeout(() => {
        this.explorePhase();
      }, 500);
    } else {
    }
  }

  scorePhase() {
    console.log('%c-scorePhase', 'background:pink;color:white');
    this.setState({
      phase: 'scoring',
    });
  }

  shuffleDeck(array) {
    // Shuffle cards
    const shuffledDeck = [...array.sort(() => Math.random() - 0.5)];
    // Verify if an ambush is after a ruin and permutate their positions

    return shuffledDeck;
  }

  render() {
    return (
      <Container
        menuAction={this.switchTabs}
        isGoalsReady={this.state.isGoalsReady}
      >
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

export default Cartographers;
