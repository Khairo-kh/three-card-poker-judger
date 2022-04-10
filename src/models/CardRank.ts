import { Card } from '../types/Card';
import { CardName } from '../types/CardName';
import { Rank } from '../types/Rank';

export class RankedCardSet implements Rank {
  public rankArray: CardName[] = [
    CardName.Two,
    CardName.Three,
    CardName.Four,
    CardName.Five,
    CardName.Six,
    CardName.Seven,
    CardName.Eight,
    CardName.Nine,
    CardName.Ten,
    CardName.Jack,
    CardName.Queen,
    CardName.King,
    CardName.Ace,
  ];

  getRank(card: Card): number {
    return this.rankArray.indexOf(card.cardName);
  }
  isHigherThan(firstCard: Card, secondCard: Card): boolean {
    return this.getRank(firstCard) > this.getRank(secondCard);
  }
}
