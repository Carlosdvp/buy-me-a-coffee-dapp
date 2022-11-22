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

