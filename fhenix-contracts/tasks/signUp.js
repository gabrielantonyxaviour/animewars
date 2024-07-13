task("init-game").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const encryptedERC20 = new ethers.Contract(
    "0xCd74978AA1B264c78469969d6ECCA648643274df",
    [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "InvalidShortString",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "str",
            type: "string",
          },
        ],
        name: "StringTooLong",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [],
        name: "EIP712DomainChanged",
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
        inputs: [],
        name: "eip712Domain",
        outputs: [
          {
            internalType: "bytes1",
            name: "fields",
            type: "bytes1",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "verifyingContract",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "uint256[]",
            name: "extensions",
            type: "uint256[]",
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
          {
            internalType: "bytes32",
            name: "_publicKey",
            type: "bytes32",
          },
        ],
        name: "getCards",
        outputs: [
          {
            internalType: "bytes[8]",
            name: "_data",
            type: "bytes[8]",
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
        name: "playerCards",
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
            name: "character",
            type: "uint8",
          },
        ],
        name: "signUp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer
  );

  const response = await encryptedERC20
    .connect(signer)
    .initGame(
      [
        "weed",
        [
          "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
          "0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac",
          "0x5A6B842891032d702517a4E52ec38eE561063539",
          "0xace8655DE7f2a1865DDd686CFcdD47447B86965C",
        ],
      ],
      {
        gasLimit: 30000000,
      }
    );
  const receipt = await response.wait();
  console.log(receipt);
});
