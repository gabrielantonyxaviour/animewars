const { networks } = require("../../networks");

task("deploy-core", "Deploys the AnimeWarsCore contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying AnimeWarsCore contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const args = [networks.fhenixTestnet.mailbox];

    const pythTesterContractFactory = await ethers.getContractFactory(
      "AnimeWarsCore"
    );

    const pythTesterContract = await pythTesterContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        pythTesterContract.deployTransaction.hash
      } to be confirmed...`
    );

    await pythTesterContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed AnimeWarsCore contract to:",
      pythTesterContract.address
    );

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
          address: pythTesterContract.address,
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
      `\n AnimeWarsCore contract deployed to ${pythTesterContract.address} on ${network.name}`
    );
  });
