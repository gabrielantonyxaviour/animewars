const { networks } = require("../../networks");

task("deploy-character", "Deploys the AnimeCharacterNFT contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying AnimeCharacterNFT contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const apeCoin = "0x65d17BddE6570ce115Cafc5Ff49E24a1B4C10e35";
    const nounsCoin = "0x7dca30F5B6A23c5f6f0Da17b7EAb95Eda44a60b4";

    const args = [
      "0x0429A2Da7884CA14E53142988D5845952fE4DF6a",
      [apeCoin, nounsCoin],
    ];

    const animeWarsEvmFactory = await ethers.getContractFactory(
      "AnimeCharacterNFT"
    );

    const characterErc = await animeWarsEvmFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        characterErc.deployTransaction.hash
      } to be confirmed...`
    );

    await characterErc.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log(
      "\nDeployed AnimeCharacterNFT contract to:",
      characterErc.address
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
          address: characterErc.address,
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
      `\n AnimeCharacterNFT contract deployed to ${characterErc.address} on ${network.name}`
    );
  });
