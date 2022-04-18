import { Card } from '../card/Card';
import { Rank } from '../card/Rank';
import { RankedCardSet } from '../card/RankedCardSet';
import { Hand } from './Hand';

export class PokerHand implements Hand {
  private _cards: Array<Card>;

  constructor(cards: Array<Card>) {
    this._cards = cards;
    this.sortCards(new RankedCardSet());
  }

  get cards() {
    return this._cards;
  }

  set cards(cards: Card[]) {
    this._cards = cards;
  }

  sortCards(rankCriteria: Rank): Array<Card> {
    const currentHand = [...this._cards];
    let sortedHand: Array<Card> = [];
    sortedHand = currentHand.sort((a: Card, b: Card) => rankCriteria.getRankVal(a) - rankCriteria.getRankVal(b));
    this.cards = sortedHand
    return sortedHand;
  }
}
