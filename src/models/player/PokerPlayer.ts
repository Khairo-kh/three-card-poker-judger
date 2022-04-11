import { Hand } from '../hand/Hand';
import { Player } from './Player';

class PokerPlayer implements Player {
  public id: number;
  private score: number;
  private hand: Hand;

  constructor(id: number, hand: Hand) {
    this.id = id;
    this.hand = hand;
    this.score = 0;
  }

  public getHand(): Hand {
    return this.hand;
  }
  public setHand(hand: Hand): Player {
    this.hand = hand;
    return this;
  }
  public setScore(score: number): Player {
    this.score = score;
    return this;
  }
  public getScore(): number {
    return this.score;
  }
}
