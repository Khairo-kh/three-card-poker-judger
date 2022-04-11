import { Hand } from '../hand/Hand';

export interface Player {
  id: number;
  score: number;
  hand: Hand;
}
