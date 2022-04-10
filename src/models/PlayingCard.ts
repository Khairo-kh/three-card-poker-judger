import { Card } from '../types/Card';
import { CardName } from '../types/CardName';
import { Suit } from '../types/Suits';

class PlayingCard implements Card {
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
