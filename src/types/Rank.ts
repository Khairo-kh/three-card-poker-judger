import { Card } from './Card';
import { CardName } from './CardName';

export interface Rank {
  rankArray: CardName[];

  getRank(card: Card): number;
  isHigherThan(firstCard: Card, secondCard: Card): boolean;
}
