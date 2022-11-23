# Buy me a Coffee dApp

We will be using Hardhat to:

- generate the project template
- test our smart contract code
- deploy to the Goerli test network


Basic Hardhat tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

--------------------------------------

### The important folders and files are:

- contracts/
    - in this project we'll only create one, to organize our BuyMeACoffee logic
- scripts/
    - we will write deploy logic
    - example buy-coffee script
    - and a withdraw script to cash out our tips
- hardhat.config.js


---------------------------------------

## Deployed Contract Address -- Goerli

0x8F7ac69FCD989485366B805883B99A759cd4e255


---------------------------------------

1. Initialize the hardhat project 
2. Write the smart contract
3. Write the tests

---------------------------------------

`testerScript.js`
The `main()` function holds the main logic:

1. Get the example accounts' addresses
2. Get the contract to deploy
3. Deploy the contract
4. Check account balance before they buy you a coffee
5. Buy the owner a few coffees
6. Check the account balances after they buy you some coffees
7. Withdraw the tips
8. Check the accounts' balances after the tips are withdrawn
9. Read the messages (memos)

-------------------------------------------

