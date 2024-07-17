const abi = require("../abi.json");

task("sign-up").setAction(async function (taskArguments, hre) {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const animewarsCore = new ethers.Contract(
    "0x16CBC6Cb38D19B73A3b545109c70b2031d20EA37",
    abi,
    signer
  );
  const args = [
    "31svwed",
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
