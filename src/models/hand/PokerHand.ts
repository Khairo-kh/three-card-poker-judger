import { Card } from '../card/Card';
import { Rank } from '../card/Rank';
import { Suit } from '../card/Suits';
import { Hand } from './Hand';

export class PokerHand implements Hand {
  public cards: Array<Card>;

  constructor(cards: Array<Card>) {
    this.cards = cards;
  }
  sortCards(rankCriteria: Rank): Array<Card> {
    const currentHand = [...this.cards];
    if (currentHand.length < 3) {
      throw new Error('The hand is empty or have less than 3 cards which is invalid for 3-cards poker!');
    }

    let sortedHand: Array<Card> = [];
    let suitCardsMap: Map<Suit, Card[]> = new Map<Suit, Card[]>();

    this.cards.forEach((card) => {
      const targetCollection = suitCardsMap.get(card.suit);
      targetCollection === undefined
        ? suitCardsMap.set(card.suit, [card])
        : suitCardsMap.set(card.suit, [...targetCollection, card]);
    });
      suitCardsMap = new Map<Suit, Card[]>([...suitCardsMap.entries()].sort());
      
    console.log('paaaam', suitCardsMap);

    suitCardsMap.forEach((group: Card[]) => {
      sortedHand = sortedHand.concat(
        group.sort((a: Card, b: Card) => {
          return rankCriteria.getRank(a) - rankCriteria.getRank(b);
        }),
      );
    });

    this.cards = [...sortedHand];
    return sortedHand;
  }
}
