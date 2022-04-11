import { Card } from './Card';
import { CardName } from './CardName';
import { Suit } from './Suits';

export class PlayingCard implements Card {
  public suit: Suit;
  public cardName: CardName;

  constructor(cardName: CardName, suit: Suit) {
    this.suit = suit;
    this.cardName = cardName;
  }

  public toString(): string {
    return this.cardName;
  }

}
