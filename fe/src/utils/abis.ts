export const EVM_ABI = [
  {
    inputs: [
      {
        internalType: "contract IMailbox",
        name: "_mailbox",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "core",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "destinationAddress",
        type: "bytes32",
      },
    ],
    name: "DestinationNotSupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "requiredFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sentFee",
        type: "uint256",
      },
    ],
    name: "InadequateCrosschainFee",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageDispatched",
    type: "event",
  },
  {
    inputs: [],
    name: "ARMOUR",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ATTACK",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DODGE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAL",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PET",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SPELL",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRANCE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "destinationAddresses",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address[4]",
        name: "players",
        type: "address[4]",
      },
    ],
    name: "getInstantiateGameCrosschainData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        internalType: "struct AnimeWarsRootstock.Move[]",
        name: "moves",
        type: "tuple[]",
      },
    ],
    name: "getMakeMoveCrosschainData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "character",
        type: "uint8",
      },
    ],
    name: "getSignUpCrosschainData",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address[4]",
        name: "players",
        type: "address[4]",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
    ],
    name: "instantiateGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address[4]",
        name: "players",
        type: "address[4]",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
    ],
    name: "instantiateGame_",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mailbox",
    outputs: [
      {
        internalType: "contract IMailbox",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        internalType: "struct AnimeWarsRootstock.Move[]",
        name: "moves",
        type: "tuple[]",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "makeMove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        internalType: "struct AnimeWarsRootstock.Move[]",
        name: "moves",
        type: "tuple[]",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "makeMove_",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_destinationDomain",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_destinationAddress",
        type: "bytes32",
      },
    ],
    name: "setDestinationAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "character",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "signUp",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCoe",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "character",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "signUp_",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "destination",
        type: "uint32",
      },
    ],
    name: "testing",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
export const CORE_ABI = [
  {
    inputs: [
      {
        internalType: "contract IMailbox",
        name: "_mailbox",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "caller",
        type: "bytes32",
      },
    ],
    name: "InvalidOrigin",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "NotMailbox",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "b",
        type: "bytes",
      },
    ],
    name: "DResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "b",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "c",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "d",
        type: "uint8",
      },
    ],
    name: "DecodedReslutB",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "gameCode",
            type: "string",
          },
          {
            internalType: "address[4]",
            name: "players",
            type: "address[4]",
          },
        ],
        indexed: false,
        internalType: "struct AnimeWarsCore.GameRequestInput",
        name: "a",
        type: "tuple",
      },
    ],
    name: "DecodedResultA",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "a",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "b",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "c",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct AnimeWarsCore.Move[]",
        name: "d",
        type: "tuple[]",
      },
    ],
    name: "DecodedResultC",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[4]",
        name: "players",
        type: "address[4]",
      },
    ],
    name: "GameInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[4]",
        name: "players",
        type: "address[4]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lordIndex",
        type: "uint256",
      },
    ],
    name: "GameStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "action",
        type: "uint256",
      },
    ],
    name: "InvalidAction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct AnimeWarsCore.Move[]",
        name: "moves",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "moveIndex",
        type: "uint8",
      },
    ],
    name: "MoveInvalid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct AnimeWarsCore.Move[]",
        name: "moves",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "moveIndex",
        type: "uint8",
      },
    ],
    name: "MoveValid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "PlayerSignedup",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct AnimeWarsCore.Move[]",
        name: "moves",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "moveIndex",
        type: "uint8",
      },
    ],
    name: "TurnSuccess",
    type: "event",
  },
  {
    inputs: [],
    name: "ARMOUR",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ATTACK",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DODGE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HEAL",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PET",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SPELL",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRANCE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "gameRequests",
    outputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "playersSignedUp",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "lordCount",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "alliesCount",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "rebelsCount",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "traitorCount",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "lordIndex",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "turn",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "winner",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "spellsDisabledCooldown",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "getCards",
    outputs: [
      {
        internalType: "uint8[8]",
        name: "_data",
        type: "uint8[8]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_gameCode",
        type: "string",
      },
    ],
    name: "getOrder",
    outputs: [
      {
        internalType: "uint8[4]",
        name: "",
        type: "uint8[4]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_sender",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
    ],
    name: "handle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "gameCode",
            type: "string",
          },
          {
            internalType: "address[4]",
            name: "players",
            type: "address[4]",
          },
        ],
        internalType: "struct AnimeWarsCore.GameRequestInput",
        name: "_input",
        type: "tuple",
      },
    ],
    name: "initGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mailbox",
    outputs: [
      {
        internalType: "contract IMailbox",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "playerIndex",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "by",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "to",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "cardId",
            type: "uint8",
          },
        ],
        internalType: "struct AnimeWarsCore.Move[]",
        name: "moves",
        type: "tuple[]",
      },
    ],
    name: "makeMoves",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "originAddresses",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "playerCardsCategorized",
    outputs: [
      {
        internalType: "euint8",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerSignupStatus",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "players",
    outputs: [
      {
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "health",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "armour",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "character",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "equippedArmour",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "equippedPet",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "tranceCooldown",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "cardCount",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_origin",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "_caller",
        type: "bytes32",
      },
    ],
    name: "setOrigin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "gameCode",
        type: "string",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "index",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "character",
        type: "uint8",
      },
    ],
    name: "signUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
