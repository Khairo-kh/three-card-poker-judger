import { PlayerAdapter } from './models/player/PlayerAdapter';
import { PokerEvaluator } from './services/PokerEvaluator';
// import { getStandardInput } from './utils/ReadStandardInput';

// Getting the values from stdin and parsing to an array
// const input = getStandardInput().split('\n');

const input = `4
0 4c 4d 4s
1 Jh 9h Th
2 7d 8d 9d
3 Tc 9s Jc`.split('\n');

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
  console.log(`ID: ${player.id} =>`, player.score, '\n=> ', player.hand.cards);
});

// breaking ties if there is any and retrieving the  result

const winners = judge.winner(playerAdapter.players);
// console.log(winners);
const winnerId = new Array<number>();

winners.forEach((player) => {
  winnerId.push(player.id);
});

winnerId.sort((a, b) => a - b);

console.log(winnerId.join(' '));
