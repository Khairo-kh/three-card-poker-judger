import { PlayerAdapter } from './models/player/PlayerAdapter';
import { PokerEvaluator } from './services/PokerEvaluator';
import { getStandardInput } from './utils/ReadStandardInput';

// Getting the values from stdin and parsing to an array
const input = getStandardInput().split('\n');

/**
 * If you are running the application manually, you can comment out the input above
 * coming from stdin and pass an input manually as shown below. You can uncomment
 * the following and try different combinations.
 */

// const input = `4
// 0 Qc Kc 4s
// 1 Ah 2c Js
// 2 3h 9h Th
// 3 Tc 9c 3c`.split('\n');

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
const winners = judge.winner(playerAdapter.players);
const winnerId = new Array<number>();

winners.forEach((player) => {
  winnerId.push(player.id);
});

// Making sure the IDs are in ascending order if we have a tie
winnerId.sort((a, b) => a - b);

// printing the results
console.log(winnerId.join(' '));
