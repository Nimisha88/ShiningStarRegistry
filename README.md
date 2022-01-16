# Shining Star Registry
A decentralized app (Dapp) that allows you to create, exchange, and transfer ownership of unique star token (CryptoStar) on the Ethereum Blockchain Testnet (Ropsten) using smart contracts and the non-fungible (ERC721) token standard.


## Software, Firmware and Hardware

* HTML5, CSS3, JavaScript(ES5 & ES6)
* Truffle v5.4.26 (core: 5.4.26), Solidity - 0.8.0 (solc-js), Web3.js v1.5.3
* NodeJS v16.13.1 and following npm packages:
  * web3 v1.6.1
  * @openzeppelin/contracts v4.4.2, @truffle/hdwallet-provider v2.0.0
  * fs v0.0.1-security
  * buffer v6.0.3, process v0.11.10, stream-http v3.2.0
  * babel-loader v8.2.3, style-loader v3.3.1, css-loader v6.5.1
  * @babel/plugin-transform-runtime v7.16.8, @babel/preset-env v7.16.8
  * clean-webpack-plugin v4.0.0, html-webpack-plugin v5.5.0
  * webpack v5.66.0, webpack-cli v4.9.1, webpack-dev-server v4.7.3


## Installation instructions

* Install [NodeJS](https://nodejs.org/)
* Install [Truffle](https://trufflesuite.com/index.html) `npm install -g truffle`
* Download the application locally and do the following:
  * In the main application folder, create `.secret` file and add your mnemonic for Ropsten Account
  * In `truffle-config.js` add your [Infura](https://infura.io/) link to Ropsten at 2 places where it says `<Add-Your-Infura-Ropsten-Link-Here>`
* Open terminal, `cd` to:
  * the main application folder containing `package.json` and install dependencies by running `npm install`
  * the app folder containing `package.json` and install dependencies by running `npm install`


## Application access

* **Local Development Network**: To run the application in Development Network:
  * Open terminal, `cd` to main application folder and run `truffle develop` (Should give you 10 accounts along with mnemonic).
  * `truffle(develop)>` must show at the start of the line. Run command `compile`.
  * `truffle(develop)>` must show at the start of the line. Run command `migrate --reset`.
  * `truffle(develop)>` must show at the start of the line. Run command `test` to run test cases.
  * Optionally, in Metamask, add Network: `127.0.0.1:9545` with Chain ID: `1337` and import at least 2 of the above 10 accounts on Metamask to view all transactions.
  * Open another terminal, `cd ` to `app` folder and run `npm run dev`.
  * Access Web Application at `http://localhost:8080/` or  `127.0.0.1:8080`.

* **Ropsten Test Network**: To run application in Ropsten Test Network:
  * Open terminal, `cd` to main application folder and run `truffle migrate --network ropsten --reset`.
  * Open another terminal, `cd ` to `app` folder and run `npm run dev`.
  * Access Web Application at `http://localhost:8080/` or  `127.0.0.1:8080`.
  * Open Metamask, switch to `Ropsten` Network and connect your Ropsten account(s) to the web application.
  * For each transaction, you will receive a notification in Metamask that needs to be confirmed to proceed further.

## To note

  * `Switch Account` works only for `Local Development Network` as there are 10 accounts associated with the same mnemonic.
  * Instead of npm package `copy-webpack-plugin`, `html-webpack-plugin` is being used with loaders.
  * The application uses latest version of all required packages to eliminate dependency errors.


## Folder Structure

* main
  * README.md - Read me file
  * .gitignore - Files that were ignored in commit
  * .gitattributes - Attribute file for Truffle
  * package.json - Contains list of installable dependencies needed to run the application locally
  * truffle-config.js - Truffle configurations for Development and Ropsten
  * contracts - Solidity Contracts
  * migrations - Migration Files
  * build - Compile Files
  * test - Test Files
  * app
    * src/assets/* - Images used in the application
    * src/index.html - Landing page
    * src/index.js - Entry file of the application
    * src/styles.css - Styling script
    * package.json - Contains list of installable dependencies needed to run the application locally
    * webpack.config.js - Webpack configuration file


## Copyright

The application is designed and developed by **Nimisha Viraj** as a part of [Udacity's Blockchain Developer Nanodegree](https://www.udacity.com/course/blockchain-developer-nanodegree--nd1309).


## Acknowledgements

* [Udacity](https://udacity.com) - Source of application requirements
* [FontAwesome](https://fontawesome.com/) - Source of Icons
* [GoogleFonts](https://fonts.google.com/) - Source of fonts
* [Stackoverflow](https://stackoverflow.com/) - Source of resolutions to coding errors and roadblocks
* [StackExchange](ethereum.stackexchange.com) - Source of resolutions to Ethereum related coding errors and roadblocks


## Limitation and Scope

* If Metamask is installed in a browser, application automatically uses Metamask. For running in Development mode, use a browser where Metamask is not present.
* Token ID to create a star can be coded to be tracked by the application.
