import { Card } from '../card/Card';
import { Rank } from '../card/Rank';

export interface Hand {
  cards: Array<Card>;
  sortCards(rankCriteria: Rank): Array<Card>;

}
