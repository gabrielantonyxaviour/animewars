const abi = require("../core-abi.json");
const { networks } = require("../networks");

task("sign-up").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );
  const args = [
    "onetwo",
    "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
    "0",
    "2",
  ];
  console.log(args.length);

  const response = await animewarsCore.signUp(args, {
    gasLimit: 30000000,
  });
  const receipt = await response.wait();
  console.log(receipt);
});
