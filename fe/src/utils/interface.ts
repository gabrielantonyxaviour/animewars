interface RoomPlayer {
  id: string;
  name: string;
  address: string;
  pfp: string;
}

interface Ability {
  id: number;
  name: string;
  description: string;
  animation: string;
  isInherent: boolean;
  cooldown: number;
}

interface Character {
  id: number;
  family: string;
  name: string;
  card: string;
  attackable: string;
  selected: string;
  weapon: string;
  maxHealth: number;
  maxArmour: number;
  attack: {
    name: string;
    animation: string;
  };
  specialAttack: {
    name: string;
    animation: string;
  };
  description: string;
  abilities: Ability[];
}

interface Player {
  id: number;
  order: number;
  name: string;
  address: string;
  pfp_id: string;
  health: number;
  armour: number;
  character: number | null;
  equippedArmour: number | null;
  equippedPet: number | null;
  cards: number[];
  tranceCooldown: number;
  poisonCooldown: number;
  role: number;
  isAlive: boolean;
}
interface GamePlay {
  state:
    | "choose_character"
    | "declare_lord"
    | "waiting_for_move"
    | "waiting_for_discard"
    | "spell"
    | "attack"
    | "trance"
    | "potion"
    | "kill"
    | "equip_armour"
    | "equip_pet"
    | "end_turn"
    | "ability";
  by: number;
  to: number | null;
  move: number; // move number each player doing something is a move
  turn: number; // turn number each player playing is a turn
  metadata: any; // information related to the ability, pet or armout to show relevant animation
}
interface GameState {
  turn: number;
  players: Player[];
  deck: number[];
  initTransaction: string;
  spellsDisabled: number;
  currentPlay: GamePlay | null;
  winner: "lord & allies" | "rebels" | "traitor" | null;
  gameState: "not started" | "in progress" | "ended";
}

interface Card {
  id: number;
  cardId: number;
  name: string;
  image: string;
  description: string;
  kind: "red" | "black" | "armour" | "spell" | "pet";
}

export type {
  RoomPlayer,
  Card,
  GameState,
  Player,
  Character,
  Ability,
  GamePlay,
};
