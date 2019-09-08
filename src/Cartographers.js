import React, { Component } from 'react';
import _ from 'lodash';

// Import Data
import CARDS from './cards';
// Import Components
import Container from './Container';
import GoalsSelection from './GoalsSelection';
import Explore from './Explore';
import Season from './Season';

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
      round: -1,
      deckIndex: 0,
      currentSeason: {},
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
      this.state.tab !== prevState.tab &&
      this.state.tab === 'game' &&
      !this.state.isGameActive
    ) {
      this.setup();
    }
  }

  switchTabs(e) {
    const id = typeof e === 'string' ? e : e.target.id;

    if (id && this.state.tab !== id) {
      this.setState({ tab: id });
    }
  }

  selectGoalCard(value, letter) {
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
    this.setState({
      isGoalsReady: true,
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
    }, 1000);
  }

  setupSeason() {
    // Increase season
    const round = this.state.round + 1;
    // Reset deck index
    const deckIndex = 0;
    // Get ambush card
    const ambushDeck = [...this.state.ambushDeck];
    const ambushCard = ambushDeck.pop();
    // Get deck
    let deck = [...this.state.deck];
    // Add ambush card to deck and shuffle
    deck.push(ambushCard);
    deck = this.shuffleDeck(deck);
    // Set current season
    const currentSeason = { ...CARDS.SEASON_CARDS[round] };
    this.setState({
      round,
      deckIndex,
      ambushDeck,
      deck,
      currentSeason,
    });
  }

  startSeason() {
    this.setState({
      phase: 'explore',
    });
  }

  nextTurn() {
    // Check of season threshold
    if (this.deckIndex + 1 >= this.currentSeason.duration) {
      this.scorePhase();
    } else {
      this.explorePhase();
    }
  }

  explorePhase() {
    // Add one to deckIndex
    const deckIndex = this.state.deckIndex + 1;
    // Revealing next card of the deck
    const currentCard = this.statedeck[deckIndex];
    // If ruin, call explore phase again
    if (currentCard.type === 'ruin') {
      // Display card
      // TO-DO
      // Call explore phase again
      this.explorePhase();
    }

    this.setState({
      deckIndex,
    });
  }

  scorePhase() {
    console.log('SCORE PHASE');
  }

  shuffleDeck(array) {
    // Shuffle cards
    const shuffledDeck = [...array.sort(() => Math.random() - 0.5)];
    // Verify if an ambush is after a ruin and permutate their positions

    return shuffledDeck;
  }

  render() {
    console.log(this.state);
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
          <Explore state={this.state} />
        )}
      </Container>
    );
  }
}

export default Cartographers;
