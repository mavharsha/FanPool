const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const FanPoolContract = await hre.ethers.getContractFactory("FanPool");
    const fanpool = await FanPoolContract.deploy();

    await fanpool.deployed();
    console.log("FanPool Contract address:", fanpool.address);
    updateEnvWithDeployedAddress(fanpool.address);
    saveFrontendFiles(fanpool);
}

function saveFrontendFiles(contract) {
    const contractsDir = __dirname + "/../src/abis";

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + "/fan-pool-address.json",
        JSON.stringify({ fanPool: contract.address }, undefined, 2)
    );

    const FanPoolArtifact = artifacts.readArtifactSync("FanPool");

    fs.writeFileSync(
        contractsDir + "/Fanpool.json",
        JSON.stringify(FanPoolArtifact, null, 2)
    );
}



function updateEnvWithDeployedAddress(deployedAddress) {
	const result = require('dotenv').config()
	if (result.error) {
		throw result.error
	}
	result.parsed.DEPLOYED_ADDRESS = deployedAddress;
	fs.writeFileSync('./.env', stringify(result.parsed)) 
}

function stringify(obj) {
	let result = ''
	for (const [key, value] of Object.entries(obj)) {
		if (key) {
			const line = `${key}=${String(value)}`
			result += line + '\n'
		}
	}
	return result
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });