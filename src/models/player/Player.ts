import { Hand } from '../hand/Hand';

export interface Player {
  id: number;

  getHand(): Hand;
  setHand(hand: Hand): Player;
  setScore(score: number): Player;
  getScore(): number;
}
