import { PlayerAdapter } from './models/player/PlayerAdapter';
import { PokerEvaluator } from './services/PokerEvaluator';
// import { getStandardInput } from './utils/ReadStandardInput';

// Getting the values from stdin and parsing to an array
// const input = getStandardInput().split('\n');

const input = `5
0 3s 9s Ts
1 3d 9d Td
2 3h 9h Th
4 6h 7h 8h
3 Tc 9c 3c`.split('\n');

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
  console.log(`ID: ${player.id} =>`, player.score);
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
