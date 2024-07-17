const abi = require("../../core-abi.json");
const { networks } = require("../../networks");

function addressToBytes32(address) {
  if (!ethers.utils.isAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }
  let addressWithoutPrefix = address.substring(2);
  let paddedAddress = addressWithoutPrefix.padStart(64, "0");
  let bytes32Address = "0x" + paddedAddress;
  return bytes32Address;
}

task("handle-init-game").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );

  const message =
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000005494ee4a6d7d087debafc2c16340cce93f763d380000000000000000000000005494ee4a6d7d087debafc2c16340cce93f763d380000000000000000000000005494ee4a6d7d087debafc2c16340cce93f763d380000000000000000000000005494ee4a6d7d087debafc2c16340cce93f763d38000000000000000000000000000000000000000000000000000000000000000861666a6b73616566000000000000000000000000000000000000000000000000";

  const response = await animewarsCore.handle(
    ...[
      networks.arbitrumSepolia.chainId,
      addressToBytes32("0x0000000000000000000000000000000000000000"),
      message,
    ],
    {
      gasLimit: 30000000,
    }
  );
  const receipt = await response.wait();
  console.log(receipt);
});
