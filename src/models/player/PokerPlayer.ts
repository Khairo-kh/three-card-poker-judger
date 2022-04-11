import { Hand } from '../hand/Hand';
import { Player } from './Player';

export class PokerPlayer implements Player {
  private _id: number;
  private _score: number;
  private _hand: Hand;

  constructor(id: number, hand: Hand) {
    this._id = id;
    this._hand = hand;
    this._score = 0;
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
  set score(score: number) {
    this._score = score;
  }
  get score(): number {
    return this._score;
  }
}
