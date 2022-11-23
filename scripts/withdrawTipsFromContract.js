const hre = require("hardhat");
const buyMeACoffeeContract = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");
const goerliApiKey = process.env.API_KEY;
const walletPrivateKey = process.env.PRIVATE_KEY;

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);

  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  // Get the contract that was deployed to Goerli
  const deployedContractAddress = "0x8F7ac69FCD989485366B805883B99A759cd4e255";
  const contractABI = buyMeACoffeeContract.abi;

  // Get the Node and Wallet connection
  // here w are hardcoding the Netowrk to work with - Goerli
  const provider = new hre.ethers.providers.AlchemyProvider('goerli', goerliApiKey);
  // Signer should be the same as 'deployer' address
  const signer = new hre.ethers.Wallet(walletPrivateKey, provider);
  // Instantiate contract
  const buyMeACoffee = new hre.ethers.Contract(
    deployedContractAddress, 
    contractABI, 
    signer
    );
  
  // check starting balance
  console.log("Owner: current balance: ", await getBalance(provider, signer.address), 'ETH');

  const contractBalance = await getBalance(provider, buyMeACoffee.address);

  console.log("Contract's current balance: ", await getBalance(provider, buyMeACoffee.address), "ETH");

  // If there are funds held in the contract, withdraw
  if (contractBalance > '0.0') {
    console.log('Withdrawing funds ...');
    const withdrawTx = await buyMeACoffee.withdrawTips();
    await withdrawTx.wait();
  } else {
    console.log('No funds to withdraw.');
  }

  // check ending balance
  console.log('Owner: current balance: ', await getBalance(provider, signer.address), 'ETH');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
