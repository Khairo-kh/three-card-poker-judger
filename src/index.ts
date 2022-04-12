import { PlayerAdapter } from './models/player/PlayerAdapter';
import { PokerEvaluator } from './services/PokerEvaluator';
// import { getStandardInput } from './utils/ReadStandardInput';

// const input = getStandardInput().split('\n');
const input = `3
0 Kh 4d 3c
1 Jd 5c 7s
2 9s 3h 2d`.split('\n');

const playerAdapter = new PlayerAdapter();
const judge = new PokerEvaluator();

for (let index = 1; index <= parseInt(input[0]); index++) {
  playerAdapter.playerInitializer(input[index]);
}

playerAdapter.players.forEach((player) => {
  player.score = judge.evaluateHand(player.hand);
});

console.log(judge.winner(playerAdapter.players).id);
