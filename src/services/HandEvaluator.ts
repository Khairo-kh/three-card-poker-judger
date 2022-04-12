import { PokerHand } from 'src/models/hand/PokerHand';
import { HandResult } from './HandResult';

export interface HandEvaluator {
  evaluateHand(hand: PokerHand): HandResult;
  handNumericValue(hand: PokerHand): number;
}
