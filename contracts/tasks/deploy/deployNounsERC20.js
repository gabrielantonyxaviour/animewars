const { networks } = require("../../networks");

task("deploy-nouns", "Deploys the NounsERC20 contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying NounsERC20 contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = ["0x0429A2Da7884CA14E53142988D5845952fE4DF6a"];

    const animeWarsEvmFactory = await ethers.getContractFactory("NounsERC20");

    const nounsErc = await animeWarsEvmFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        nounsErc.deployTransaction.hash
      } to be confirmed...`
    );

    await nounsErc.deployTransaction.wait(networks[network.name].confirmations);

    console.log("\nDeployed NounsERC20 contract to:", nounsErc.address);

    if (network.name === "localFunctionsTestnet") {
      return;
    }

    const verifyContract = taskArgs.verify;
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: nounsErc.address,
          constructorArguments: args,
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(
      `\n NounsERC20 contract deployed to ${nounsErc.address} on ${network.name}`
    );
  });
