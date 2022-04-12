import { PlayingCard } from 'src/models/card/PlayingCard';
import { Rank } from 'src/models/card/Rank';
import { RankedCardSet } from '../models/card/RankedCardSet';
import { Suit } from 'src/models/card/Suits';
import { PokerHandResult } from '../models/hand/PokerHandResult';
import { HandEvaluator } from './HandEvaluator';
import { HandResult } from './HandResult';
import { CardName } from '../models/card/CardName';
import { Hand } from 'src/models/hand/Hand';
import { Player } from 'src/models/player/Player';
import { Card } from 'src/models/card/Card';

export class PokerEvaluator implements HandEvaluator {
  private _rankCriteria: Rank = new RankedCardSet();
  private _scoreRanking = [
    PokerHandResult.Nothing,
    PokerHandResult.HighCard,
    PokerHandResult.Pair,
    PokerHandResult.Flush,
    PokerHandResult.Straight,
    PokerHandResult.ThreeOfAKind,
    PokerHandResult.StraightFlush,
  ];

  handNumericValue(hand: Hand): number {
    const cards = hand.cards;
    let numericVal = 0;
    cards.forEach((card) => {
      numericVal += this._rankCriteria.getRank(card);
    });
    return numericVal;
  }

  public mapToSortedArray(cardsMap: Map<Suit, PlayingCard[]>) {
    let cards = new Array<PlayingCard>();
    for (const item of cardsMap.values()) {
      cards = cards.concat(item);
    }
    cards = cards.sort((a, b) => this._rankCriteria.getRank(b) - this._rankCriteria.getRank(a));
    return cards;
  }

  public isStraight(cardsMap: Map<Suit, PlayingCard[]>): boolean {
    const cards = this.mapToSortedArray(cardsMap);
    let result = false;

    // Handling the special case of Ace One Two
    if (
      cards[0].cardName === CardName.Ace &&
      cards[1].cardName === CardName.Three &&
      cards[2].cardName === CardName.Two
    ) {
      result = true;
      return true;
    }

    // Checking for a sequence
    for (let i = 0; i + 1 !== cards.length; i++) {
      result = this._rankCriteria.getRank(cards[i]) === this._rankCriteria.getRank(cards[i + 1]) + 1;
      if (!result) {
        break;
      }
    }

    return result;
  }

  public isFlush(cardsMap: Map<Suit, PlayingCard[]>): boolean {
    const cards = this.mapToSortedArray(cardsMap);
    return cards.every((card) => card.suit === cards[0].suit);
  }

  public isThreeOfAKind(cardsMap: Map<Suit, PlayingCard[]>): boolean {
    const cards = this.mapToSortedArray(cardsMap);
    return cards.every((card) => card.cardName === cards[0].cardName);
  }

  public isPair(cardsMap: Map<Suit, PlayingCard[]>): boolean {
    const frequency = new Map<string, number>();
    let highest = 0;
    const cards = this.mapToSortedArray(cardsMap);
    cards.forEach((card) => {
      let current = frequency.get(card.toString());
      current === undefined ? frequency.set(card.toString(), 1) : frequency.set(card.toString(), ++current);
    });
    for (const value of frequency.keys()) {
      if ((frequency.get(value) as number) > highest) {
        highest = frequency.get(value) as number;
      }
    }
    return highest > 1;
  }

  public isStraightFlush(cardsMap: Map<Suit, PlayingCard[]>): boolean {
    return this.isStraight(cardsMap) && this.isFlush(cardsMap);
  }

  evaluateHand(hand: Hand): HandResult {
    const result = { numericScore: -1, scoreName: PokerHandResult.Nothing };
    const cards = this.groupBySuit(hand.cards);

    if (this.isStraightFlush(cards)) {
      result.scoreName = PokerHandResult.StraightFlush;
      result.numericScore = this.handNumericValue(hand);
    } else if (this.isFlush(cards)) {
      result.scoreName = PokerHandResult.Flush;
      result.numericScore = this.handNumericValue(hand);
    } else if (this.isStraight(cards)) {
      result.scoreName = PokerHandResult.Straight;
      result.numericScore = this.handNumericValue(hand);
    } else if (this.isThreeOfAKind(cards)) {
      result.scoreName = PokerHandResult.ThreeOfAKind;
      result.numericScore = this.handNumericValue(hand);
    } else if (this.isFlush(cards)) {
      result.scoreName = PokerHandResult.Flush;
      result.numericScore = this.handNumericValue(hand);
    } else if (this.isPair(cards)) {
      result.scoreName = PokerHandResult.Pair;
      result.numericScore = this.handNumericValue(hand);
    } else {
      result.scoreName = PokerHandResult.HighCard;
      result.numericScore = this.handNumericValue(hand);
    }

    return result;
  }

  private tieBreaker(players: Player[]) {
    const highestCardValue = new Map<Player, number>();
    const playerCardsMap = new Map<Player, Card[]>();

    players.forEach((player) => {
      console.log(player.hand.cards.shift());
      highestCardValue.set(player, this._rankCriteria.getRank(player.hand.cards.shift() as Card));
      playerCardsMap.set(player, player.hand.cards);
    });

    const highest: [Player, number] = [players[0], highestCardValue.get(players[0]) as number];
    while (playerCardsMap.size > 1) {
      for (const item of highestCardValue.entries()) {
        if (item[1] > highest[1]) {
          highestCardValue.delete(highest[0]);
          playerCardsMap.delete(highest[0]);
          highest[0] = item[0];
        } else if (item[1] < highest[1]) {
          highestCardValue.delete(item[0]);
          playerCardsMap.delete(item[0]);
        }
      }

      if (highestCardValue.size === 1) {
        return highest[0];
      }

      for (const val of playerCardsMap.entries()) {
        if (val[1].length === 0) {
          playerCardsMap.delete(val[0]);
        }
        if (!(val[0].hand.cards.length === 0)) {
          console.log('IN ', val[0].hand.cards.shift());
          highestCardValue.set(val[0], this._rankCriteria.getRank(val[0].hand.cards.shift() as Card));
        }
      }
    }
    return highest[0];
  }

  public winner(players: Player[]): Player {
    let highestScoreYet = PokerHandResult.Nothing;
    let winner: Player;
    const scorePlayerMap = new Map<PokerHandResult, Player[]>();
    players.forEach((player) => {
      const currentScore = player.score.scoreName;
      if (this._scoreRanking.indexOf(highestScoreYet) < this._scoreRanking.indexOf(currentScore)) {
        highestScoreYet = currentScore;
      }
      const currentCheck = scorePlayerMap.get(currentScore);
      currentCheck === undefined
        ? scorePlayerMap.set(currentScore, [player])
        : scorePlayerMap.set(currentScore, [...currentCheck, player]);
    });

    const finalContestants = scorePlayerMap.get(highestScoreYet);

    if (finalContestants?.length === 1) {
      winner = finalContestants[0];
      return finalContestants[0];
    }

    winner = this.tieBreaker(finalContestants as Player[]);
    return winner;
  }

  public groupBySuit(cards: PlayingCard[]): Map<Suit, PlayingCard[]> {
    let mappedCards = new Map<Suit, PlayingCard[]>();
    cards.forEach((card) => {
      const targetCollection = mappedCards.get(card.suit);
      targetCollection === undefined
        ? mappedCards.set(card.suit, [card])
        : mappedCards.set(card.suit, [...targetCollection, card]);
    });
    mappedCards = new Map<Suit, PlayingCard[]>([...mappedCards.entries()].sort());
    return mappedCards;
  }
}