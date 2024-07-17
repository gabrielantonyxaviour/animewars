const abi = require("../core-abi.json");
const { networks } = require("../networks");

task("set-origin").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );
  const args = [
    networks.arbitrumSepolia.chainId.toString(),
    networks.arbitrumSepolia.evm32,
  ];

  const response = await animewarsCore.setOrigin(...args, {
    gasLimit: 30000000,
  });
  const receipt = await response.wait();
  console.log(receipt);
});
