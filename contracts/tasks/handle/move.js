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

task("handle-move").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    networks.fhenixTestnet.core,
    abi,
    signer
  );

  const abiCoder = new ethers.utils.AbiCoder();

  const data = abiCoder.encode(
    ["string", "address", "uint8", "tuple(uint8,uint8,uint8)[]"],
    [
      "neymar",
      "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
      0,
      [
        [0, 0, 2],
        [0, 1, 0],
      ],
    ]
  );

  console.log(data);
  const signdata = abiCoder.encode(["uint256", "bytes"], [2, data]);
  console.log(signdata);

  const response = await animewarsCore.handle(
    ...[
      networks.arbitrumSepolia.chainId,
      addressToBytes32("0x0000000000000000000000000000000000000000"),
      signdata,
    ],
    {
      gasLimit: 30000000,
    }
  );
  const receipt = await response.wait();
  console.log(receipt);
});
