import { Suit } from './Suits';
import { CardName } from './CardName';
// import { Indexable } from 'src/utils/Indexable';

/**
 * Interface of a general playing card that has
 * a rank and a suit along with some useful methods
 */
export interface Card {
  suit: Suit;
  cardName: CardName;
}
