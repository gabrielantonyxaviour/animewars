const abi = require("../abi.json");

task("init-game").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37",
    abi,
    signer
  );

  const response = await animewarsCore.initGame(
    [
      "31svwed",
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
