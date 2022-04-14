import { Card } from './Card';
import { CardName } from './CardName';

// TODO: rename getRank to a more descriptive name, the current name can be mistook for the actual rank of the card not the rank value
export interface Rank {
  rankArray: CardName[];
  /**
   * This returns the value of the rank of the passed card
   * @param card a card object
   * @returns a number corresponding to the value of the card passed
   */
  getRank(card: Card): number;

  /**
   * This method compares the first card passed to the second
   * @param firstCard a card object we want to compare its value
   * @param secondCard another card object that will be compared against the first
   * @returns true if the first is higher value than the second, false otherwise
   */
  isHigherThan(firstCard: Card, secondCard: Card): boolean;
}
