const hard = require('hardhat');

async function getAccountBalance(address) {
  const walletBalanceBigInt = await hard.ethers.provider.getBalance(address);

  return hard.ethers.utils.formatEther(walletBalanceBigInt);
}

async function printBalances(addresses) {
  let index = 0;
  for (const address of addresses) {
    console.log(`Address ${index} balance: `, await getAccountBalance(address));
    index++;
  }
}

// logs the memos sotred on-chain from the coffees purchased
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`);
  }
}

async function main() {
  // get the example accounts
  const [owner, tipper, tipper2, tipper3] = await hard.ethers.getSigners();

  // get the contract to deploy
  const BuyMeACoffeeContract = await hard.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffeeContract.deploy();

  // Deploy the Contract
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  // Check balances before coffee tip
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("----- Start -----");
  await printBalances(addresses);

  // Buy me a few coffees
  const tip = {value: hard.ethers.utils.parseEther("1")};

  await buyMeACoffee.connect(tipper).buyCoffee("Elsa", "You sexy beast", tip);
  await buyMeACoffee.connect(tipper).buyCoffee("Maribel", "Nice job", tip);
  await buyMeACoffee.connect(tipper).buyCoffee("Monica", "Nice kettlebell swing", tip);

  // check balances after the coffee purchases
  console.log("--------------- Bought you some coffee ----------");
  await printBalances(addresses);

  // withdraw the tips from the contract
  await buyMeACoffee.connect(owner).withdrawTips();

  // check balances after withdrawal
  console.log("---- Tips have been withdrawn ---");
  await printBalances(addresses);

  // Review the memos
  console.log("----- The Memos ---");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// common pattern to call the main() function
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})
