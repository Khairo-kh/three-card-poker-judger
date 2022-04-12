import { PlayerAdapter } from './models/player/PlayerAdapter';
import { PokerEvaluator } from './services/PokerEvaluator';
import { getStandardInput } from './utils/ReadStandardInput';

// Getting the values from stdin and parsing to an array
const input = getStandardInput().split('\n');

// Initializing player adapter and evaluation classes
const playerAdapter = new PlayerAdapter();
const judge = new PokerEvaluator();

// Creating new user objects based on the specified length passed in stdin
for (let index = 1; index <= parseInt(input[0]); index++) {
  playerAdapter.playerInitializer(input[index]);
}

// Getting and storing scores for each player
playerAdapter.players.forEach((player) => {
  player.score = judge.evaluateHand(player.hand);
});

// breaking ties if there is any and retrieving the result
console.log(judge.winner(playerAdapter.players).id);
