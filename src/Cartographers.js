import React, { Component } from 'react';
import _ from 'lodash';

// Import Data
import CARDS from './cards';
// Import Components
import Container from './Container';
import GoalsSelection from './GoalsSelection';

class Cartographers extends Component {
  constructor() {
    super();
    this.state = {
      tab: 'goals',
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
    };

    this.switchTabs = this.switchTabs.bind(this);
    this.selectGoalCard = this.selectGoalCard.bind(this);
    this.selectRandomGoalCard = this.selectRandomGoalCard.bind(this);
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
    // Choose the 4 scoring cards (dropdowns)

    // Create deck
    this.deck = [...CARDS.EXPLORE_CARDS];
    // Create ambush deck
    this.ambush = [...CARDS.AMBUSH_CARDS];
    // Shuffle ambush cards
    this.ambush = this.shuffleDeck(this.ambush);
    // Create seasons deck
    this.seasons = [...CARDS.SEASON_CARDS];
  }

  startSeason() {
    // Increase season
    this.round += 1;
    // Reset deck index
    this.deckIndex = 0;
    // Add last ambush to deck
    this.deck.push(this.ambush.pop());
    // Shuffle deck
    this.deck = this.shuffleDeck(this.deck);
    // Set current season
    this.currentSeason = { ...CARDS.SEASON_CARDS[this.round] };
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
    this.deckIndex += 1;
    // Revealing next card of the deck
    const currentCard = this.deck[this.deckIndex];
    // If ruin, call explore phase again
    if (currentCard.type === 'ruin') {
      // Display card
      // TO-DO
      // Call explore phase again
      this.explorePhase();
    }
    // Display card
  }

  scorePhase() {}

  shuffleDeck(array) {
    // Shuffle cards
    const shuffledDeck = [...array.sort(() => Math.random() - 0.5)];
    // Verify if an ambush is after a ruin and permutate their positions

    return shuffledDeck;
  }

  render() {
    console.log(this.state);
    return (
      <Container menuAction={this.switchTabs}>
        {this.state.tab === 'goals' && (
          <GoalsSelection
            selectGoalCard={this.selectGoalCard}
            selectRandomGoalCard={this.selectRandomGoalCard}
            state={this.state}
            switchTabs={this.switchTabs}
          />
        )}
      </Container>
    );
  }
}

export default Cartographers;
