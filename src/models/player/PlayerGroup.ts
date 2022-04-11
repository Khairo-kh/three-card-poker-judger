import { Player } from './Player';

export interface PlayerGroup {
  players: Array<Player>;

  playerInitializer(playerString: string): Player;
}
