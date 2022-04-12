import { HandResult } from 'src/services/HandResult';
import { Hand } from '../hand/Hand';

export interface Player {
  id: number;
  hand: Hand;
  score: HandResult;
}
