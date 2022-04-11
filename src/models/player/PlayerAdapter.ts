import { Card } from '../card/Card';
import { CardName } from '../card/CardName';
import { PlayingCard } from '../card/PlayingCard';
import { Suit } from '../card/Suits';
import { PokerHand } from '../hand/PokerHand';
import { Player } from './Player';
import { PlayerGroup } from './PlayerGroup';
import { PokerPlayer } from './PokerPlayer';
import { getEnumByValue } from '../../utils/EnumHelpers';

export class PlayerAdapter implements PlayerGroup {
  private _players = new Array<Player>();

  get players() {
    return this._players;
  }

  set players(newPlayers: Player[]) {
    this._players = newPlayers;
  }
  playerInitializer(playerString: string): Player {
    const playerData = playerString.split(' ');
    const playerId = parseInt(playerData[0]);
    const playerCards: Array<Card> = [];
    if (playerString.length < 10 || playerData.length !== 4) {
      throw new Error(
        `Player information passed are missing one or more required values.
         Received: ${playerString} 
         Received data: ${playerData} 
         expected format: [idNumber <rank><Suit> <rank><Suit> <rank><Suit>] for each player!
         Example: 2 9s 3h 2d `,
      );
    }

    playerData.slice(1).forEach((cardStr) => {
      const cardDetails = cardStr.split('');
      const rank = getEnumByValue(CardName, cardDetails[0]);
      const suit = getEnumByValue(Suit, cardDetails[1]);
      const card = new PlayingCard(Object(CardName)[rank], Object(Suit)[suit]);

      playerCards.push(card);
    });

    const playerHand = new PokerHand(playerCards);
    const player = new PokerPlayer(playerId, playerHand);

    this._players.push(player);
    return player;
  }
}
