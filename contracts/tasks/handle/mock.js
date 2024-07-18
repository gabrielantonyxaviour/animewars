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

task("handle-mock-one").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );

  const message =
    "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000097364767364766365770000000000000000000000000000000000000000000000";

  const response = await animewarsCore.handleMockThree(
    ...[
      networks.rootstockTestnet.chainId,
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
