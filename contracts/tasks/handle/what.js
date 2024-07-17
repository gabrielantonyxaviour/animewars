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

task("what").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );

  const response = await animewarsCore.what({
    gasLimit: 30000000,
  });
  const receipt = await response.wait();
  console.log(receipt);
});
