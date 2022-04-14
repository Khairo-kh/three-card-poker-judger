import { Card } from './Card';
import { CardName } from './CardName';
import { Rank } from './Rank';

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
  
  public getRank(card: Card): number {
    return this.rankArray.indexOf(card.cardName) + 1;
  }
  public isHigherThan(firstCard: Card, secondCard: Card): boolean {
    return this.getRank(firstCard) > this.getRank(secondCard);
  }
}
