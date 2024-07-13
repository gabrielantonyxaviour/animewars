import generateCards from "./helpers/generateCards";
import { Card, Character } from "./interface";

export const MAX_PLAYERS_COUNT = 4;
export const INITIAL_CARDS_DEALT = 7;
export const TOTAL_CARDS = 108;
export const TRANCE_COOLDOWN = 3;
const redAttack: Omit<Card, "id"> = {
  cardId: 1,
  name: "Attack",
  description: "Causes 1 HP damage to the target",
  image: "/cards/basic/attack/red.gif",
  kind: "red",
};

const blackAttack: Omit<Card, "id"> = {
  cardId: 2,
  name: "Attack",
  description: "Causes 1 HP damage to the target",
  image: "/cards/basic/attack/black.gif",
  kind: "black",
};

const redDodge: Omit<Card, "id"> = {
  cardId: 3,
  name: "Dodge",
  description: "Can be used against an attack Card to nullify it.",
  image: "/cards/basic/dodge/red.gif",
  kind: "red",
};

const blackDodge: Omit<Card, "id"> = {
  cardId: 4,
  name: "Dodge",
  description: "Can be used against an attack Card to nullify it.",
  image: "/cards/basic/dodge/black.gif",
  kind: "black",
};

const redPotion: Omit<Card, "id"> = {
  cardId: 5,
  name: "Potion",
  description: "Heals 1 HP.",
  image: "/cards/basic/potion/red.gif",
  kind: "red",
};

const blackPotion: Omit<Card, "id"> = {
  cardId: 6,
  name: "Potion",
  description: "Heals 1 HP.",
  image: "/cards/basic/potion/black.gif",
  kind: "black",
};

const redTrance: Omit<Card, "id"> = {
  cardId: 7,
  name: "Trance",
  description:
    "Can be used anytime or when your character dies, which will immediately give 1 HP and increase attack by 1 HP.",
  image: "/cards/basic/trance/red.gif",
  kind: "red",
};

const blackTrance: Omit<Card, "id"> = {
  cardId: 8,
  name: "Trance",
  description:
    "Can be used anytime or when your character dies, which will immediately give 1 HP and increase attack by 1 HP.",
  image: "/cards/basic/trance/black.gif",
  kind: "black",
};

const armours: Card[] = [
  {
    id: 91,
    cardId: 9,
    name: "Limitless Infinity",
    description:
      "Only black attacks work, red attacks are automatically dodged",
    image: "/cards/armour/limitless.jpg",
    kind: "armour",
  },
  {
    id: 92,
    cardId: 10,
    name: "Nichirin Vest",
    description:
      "Attacks received are divided by 2 if greater than 1 HP damage",
    image: "/cards/armour/nichirin.jpg",

    kind: "armour",
  },
  {
    id: 93,
    cardId: 11,
    name: "Busoshoku Haki",
    description:
      "Receives Armor for equivalent amount of HP at the time of equipment. ",
    image: "/cards/armour/haki.gif",
    kind: "armour",
  },
];

const kagusiCrow: Omit<Card, "id"> = {
  cardId: 12,
  name: "Kagusi Crow",
  description: "-1 attack range to the attacker of the owner",
  image: "/cards/pet/kagusi.jpg",
  kind: "pet",
};

const flamboyantUnicorn: Omit<Card, "id"> = {
  cardId: 13,
  name: "Flamboyant Unicorn",
  description: "+1 attack range to the owner",
  image: "/cards/pet/unicorn.jpg",
  kind: "pet",
};

const pets: Card[] = [
  ...generateCards(kagusiCrow, 94, 3),
  ...generateCards(flamboyantUnicorn, 97, 3),
];

const repeller: Omit<Card, "id"> = {
  cardId: 14,
  name: "Repeller",
  description: "Can be used against a spell to nullify it.",
  image: "/cards/spell/repeller.gif",
  kind: "spell",
};

const stormOfFire: Omit<Card, "id"> = {
  cardId: 15,
  name: "Storm of Fire",
  description: "Causes 1 HP damage to everyone.",
  image: "/cards/spell/fire.gif",
  kind: "spell",
};

const zeroSpell: Omit<Card, "id"> = {
  cardId: 16,
  name: "Zero Spell",
  description:
    "Disables all players from using spells or abilities for 1 turn.",
  image: "/cards/spell/zero.gif",
  kind: "spell",
};

const spells: Card[] = [
  ...generateCards(repeller, 100, 3),
  ...generateCards(stormOfFire, 103, 3),
  ...generateCards(zeroSpell, 106, 3),
];

export const cards: Card[] = [
  ...generateCards(redAttack, 1, 15),
  ...generateCards(blackAttack, 16, 15),
  ...generateCards(redDodge, 31, 15),
  ...generateCards(blackDodge, 46, 15),
  ...generateCards(redPotion, 61, 10),
  ...generateCards(blackPotion, 71, 10),
  ...generateCards(redTrance, 81, 5),
  ...generateCards(blackTrance, 86, 5),
  ...armours,
  ...pets,
  ...spells,
];

export const characters: Character[] = [
  {
    id: 1,
    family: "Jujutsu High",
    name: "Satoru Gojo",
    weapon: "Sorcery",
    card: "/characters/gojo/card.png",
    maxHealth: 5,
    maxArmour: 5,
    attack: {
      name: "Hollow Technique: Purple",
      animation: "",
    },
    specialAttack: {
      name: "Unlimited Void",
      animation: "",
    },
    description:
      "A powerhouse with formidable attack and defense, wielding the Limitless Cursed Technique and Six Eyes for incredible abilities and heightened perception. His devastating special moves and distinctive white hair and blindfold make him instantly recognizable.",
    abilities: [
      {
        id: 1,
        name: "Limitless Infinity",
        description:
          "Only red attacks work, black attacks are automatically dodged except Toji.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Reverse Cursed Technique",
        description:
          "Can be used once in the game to heal any player to Max HP.",
        animation: "",
        isInherent: false,
        cooldown: 50,
      },
    ],
  },
  {
    id: 2,
    family: "Demons",
    name: "Muzan Kibutsuji",
    card: "/characters/muzan/card.png",
    weapon: "Blood Demon Art",
    maxHealth: 5,
    maxArmour: 5,
    attack: {
      name: "Death Granting Blood",
      animation: "",
    },
    specialAttack: {
      name: "Shockwave Blast",
      animation: "",
    },
    description:
      "The most powerful demon with abilities like Demon’s Endurance and Blood Reaper, able to sustain through attacks and harvest HP from opponents.",
    abilities: [
      {
        id: 1,
        name: "Demon’s Endurance",
        description: "Any attack causes only 1 HP damage.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Blood Reaper",
        description: "Can reap 1 HP from any player once every 4 turns.",
        animation: "",
        isInherent: false,
        cooldown: 4,
      },
    ],
  },
  {
    id: 3,
    family: "One Piece",
    name: "Monkey D Luffy",
    card: "/characters/luffy/card.png",
    weapon: "Bare Fists",
    maxHealth: 5,
    maxArmour: 5,
    attack: {
      name: "Gum Gum Pistol",
      animation: "",
    },
    specialAttack: {
      name: "Gum Gum Bajrang Gun",
      animation: "",
    },
    description:
      "A charismatic and powerful pirate with abilities like Conqueror Haki and Gear 5, capable of manipulating opponents and extending attack range.",
    abilities: [
      {
        id: 1,
        name: "Conqueror Haki",
        description:
          "Can make any player attack someone else in his attack range using Luffy’s attack card.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Gear 5",
        description: "Inherently has +1 attack range.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
    ],
  },
  {
    id: 4,
    family: "One Piece",
    card: "/characters/zoro/card.png",
    name: "Roronoa Zoro",
    maxHealth: 4,
    maxArmour: 4,
    weapon: "Wado Ichimonji, Sandai Kitetsu and Enma",
    attack: {
      name: "Toro Samon",
      animation: "",
    },
    specialAttack: {
      name: "Billion Fold World Trichiliocosm",
      animation: "",
    },
    description:
      "Master of the Three Sword Style with abilities like Observation Haki and The Promise, able to foresee moves and gain additional HP and attack strength.",
    abilities: [
      {
        id: 1,
        name: "Observation Haki",
        description:
          "Can view the top 4 cards from deck once in every 2 turns.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "The Promise",
        description: "Can be used once to get +2 HP and +1 Attack.",
        animation: "",
        isInherent: false,
        cooldown: 0,
      },
    ],
  },
  {
    id: 5,
    family: "Demon Slayers",
    card: "/characters/tengen/card.png",
    name: "Tengen Uzui",
    weapon: "Katananchuk",
    maxHealth: 4,
    maxArmour: 4,
    attack: {
      name: "Roar (First Form)",
      animation: "",
    },
    specialAttack: {
      name: "Constant Resounding Slashes (Fourth Form)",
      animation: "",
    },
    description:
      "The Sound Hashira with abilities like Stealth of a Ninja and Flamboyance, adept at avoiding attacks and boosting HP and attack strength.",
    abilities: [
      {
        id: 1,
        name: "Stealth of a Ninja",
        description:
          "Players who are not neighbors cannot attack even with extended range.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Flamboyance",
        description: "Can be used once to get +2 HP and +1 Attack.",
        animation: "",
        isInherent: false,
        cooldown: 0,
      },
    ],
  },
  {
    id: 6,
    family: "Demon Slayers",
    name: "Mitsuri Kanroji",
    maxHealth: 4,
    maxArmour: 4,
    card: "/characters/mitsuri/card.png",
    weapon: "Whip Katana",
    attack: {
      name: "Shivers of First Love (First Form)",
      animation: "",
    },
    specialAttack: {
      name: "Cat-Legged Winds of Love (Sixth Form)",
      animation: "",
    },
    description:
      "The Love Hashira with abilities like Eternal Love and Cat Reflexes, offering healing and defensive capabilities against attacks.",
    abilities: [
      {
        id: 1,
        name: "Eternal Love",
        description: "Can give 1 HP to any player of your wish on each turn.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Cat Reflexes",
        description:
          "Normal red attacks are dodged once but using another red attack card can cause damage. Trance and spell attacks cause damage no matter what.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
    ],
  },
  {
    id: 7,
    family: "Demon Slayers",
    maxHealth: 4,
    maxArmour: 4,
    card: "/characters/shinobu/card.png",
    name: "Shinobu Kocho",
    weapon: "Stinger Katana",
    attack: {
      name: "Butterfly Dance (First Form)",
      animation: "",
    },
    specialAttack: {
      name: "Dance of the Centipede (Fifth Form)",
      animation: "",
    },
    description:
      "The Insect Hashira with abilities like Poisoned Farewell and Pest Attack, inflicting damage on opponents upon death and periodically.",
    abilities: [
      {
        id: 1,
        name: "Poisoned Farewell",
        description:
          "On death, causes 2 HP damage to normal players and Muzan. 3 HP damage if it is any other demon or cursed spirit who kills her.",
        animation: "",
        isInherent: true,
        cooldown: 0,
      },
      {
        id: 2,
        name: "Pest Attack",
        description:
          "Inflicts 1 HP damage to all players; can be dodged if the user has a dodge card. Can be used once every 4 turns.",
        animation: "",
        isInherent: false,
        cooldown: 4,
      },
    ],
  },
  {
    id: 8,
    family: "Jujutsu High",
    name: "Aoi Todo",
    maxHealth: 4,
    maxArmour: 4,
    card: "/characters/todo/card.png",
    weapon: "Bare fists",
    attack: {
      name: "530,000 IQ Attack",
      animation: "",
    },
    specialAttack: {
      name: "Black Flash",
      animation: "",
    },
    description:
      "Grade 1 Jujutsu Sorcerer known for his formidable attack and defense. A master of Boogie Woogie and Bromance abilities, capable of strategic positioning and healing over time.",
    abilities: [
      {
        id: 1,
        name: "Boogie Woogie",
        description:
          "Can switch position anywhere. Can be used once every 3 turns.",
        animation: "",
        isInherent: true,
        cooldown: 3,
      },
      {
        id: 2,
        name: "Bromance",
        description: "Can heal a player 1 HP every 2 turns for 6 turns.",
        animation: "",
        isInherent: true,
        cooldown: 2,
      },
    ],
  },
];

export const WORLDCOIN_TESTER_ADDRESS =
  "0xb1515f97f08046Cf041d978068f66986Ab750FBC";
export const WORLDCOIN_TESTER_ABI = [
  {
    inputs: [
      { internalType: "contract IWorldID", name: "_worldId", type: "address" },
      { internalType: "string", name: "_appId", type: "string" },
      { internalType: "string", name: "_actionId", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "uint256", name: "nullifierHash", type: "uint256" },
    ],
    name: "DuplicateNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "Verified",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "signal", type: "address" },
      { internalType: "uint256", name: "root", type: "uint256" },
      { internalType: "uint256", name: "nullifierHash", type: "uint256" },
      { internalType: "uint256[8]", name: "proof", type: "uint256[8]" },
    ],
    name: "verifyAndExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const PYTH_TESTER_ADDRESS = "0x88854958eCE14EF7AC63AC684AAF19f7D9e84233";
export const PYTH_TESTER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_entropy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_entropyProvider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InsufficientFee",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "sequenceNumber",
        type: "uint64",
      },
    ],
    name: "RolesRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "sequenceNumber",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint8[5]",
        name: "roles",
        type: "uint8[5]",
      },
    ],
    name: "RolesResult",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "randomNumber",
        type: "bytes32",
      },
    ],
    name: "_entropyCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
    ],
    name: "generateRoles",
    outputs: [
      {
        internalType: "uint8[5]",
        name: "",
        type: "uint8[5]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getRandomnessFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "userRandomNumber",
        type: "bytes32",
      },
    ],
    name: "requestRandomRoles",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
