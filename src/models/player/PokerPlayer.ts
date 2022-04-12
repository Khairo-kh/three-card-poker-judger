import { HandResult } from 'src/services/HandResult';
import { Hand } from '../hand/Hand';
import { PokerHandResult } from '../hand/PokerHandResult';
import { Player } from './Player';

export class PokerPlayer implements Player {
  private _id: number;
  private _score: HandResult;
  private _hand: Hand;

  constructor(id: number, hand: Hand) {
    this._id = id;
    this._hand = hand;
    this._score = { numericScore: 0, scoreName: PokerHandResult.Nothing };
  }

  get id() {
    return this._id;
  }

  get hand(): Hand {
    return this._hand;
  }
  set hand(hand: Hand) {
    this._hand = hand;
  }
  set score(score: HandResult) {
    this._score = { numericScore: score.numericScore, scoreName: score.scoreName };
  }
  get score(): HandResult {
    return this._score;
  }
}
