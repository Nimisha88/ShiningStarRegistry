import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";
import "./styles.css";
import appIcon from './assets/icon.png';

const App = {
  web3: null,
  account: null,
  altAccount: null,
  meta: null,

  start: async function() {
    const { web3 } = this;
    try {
      // Get Accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.altAccount = accounts[1];

      // Get Contract Instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];

      console.log(`Network ID: ${networkId}`);
      if (networkId == 3) { // For Ropsten
        this.meta = new web3.eth.Contract(
                          starNotaryArtifact.abi,
                          deployedNetwork.address,
                          {from: this.account, gasPrice: 200000000, gas: 30000}
                        );
      }
      else { // For Truffle Develop
        this.meta = new web3.eth.Contract(
                          starNotaryArtifact.abi,
                          deployedNetwork.address,
                          {from: this.account}
                        );
      }
    }
    catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  switchAccount: function() {
    if(this.altAccount === undefined) {
      alert(`No alternate account to switch to!`);
      return;
    }
    let currentAccount = this.account;
    this.account = this.altAccount;
    this.altAccount =  currentAccount;
    alert(`Account switched to ${this.account}`);
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  showMenu: async function() {
    const status = document.getElementById("status");
    status.innerHTML = "";
    document.getElementById("cta-status").classList.add("hideEle");
    document.getElementById("cta-content").classList.remove("hideEle");
  },

  getMenuOption: function(option) {
    const ctaContent = document.getElementById("cta-content");
    const ctaDetail = document.getElementById("cta-detail");
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    const actionBtn = document.getElementById("doAction");
    ctaContent.classList.add("hideEle");
    ctaDetail.classList.remove("hideEle");

    switch(option) {
      case 'create':
        input1.placeholder = "Name of Star";
        input2.placeholder = "ID of Star";
        actionBtn.value = "Create Star";
        actionBtn.setAttribute('onClick', 'App.createStar()');
        break;
      case 'lookup':
        input1.classList.add('hideEle');
        input2.placeholder = "ID of Star";
        actionBtn.value = "Get Star Info";
        actionBtn.setAttribute('onClick', 'App.lookUp()');
        break;
      case 'exchange':
        input1.placeholder = "ID of Star 1";
        input2.placeholder = "ID of Star 2";
        actionBtn.value = "Exchange Star";
        actionBtn.setAttribute('onClick', 'App.exchangeStars()');
        break;
      case 'transfer':
        input1.placeholder = "Send to address";
        input2.placeholder = "ID of Star";
        actionBtn.value = "Transfer Star";
        actionBtn.setAttribute('onClick', 'App.transferStar()');
        break;
      default:
        alert('Not a valid Menu Option! Please try Again!');
        ctaContent.classList.remove("hideEle");
        ctaDetail.classList.add("hideEle");
    }
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const starName = document.getElementById("input1");
    const starId = document.getElementById("input2");
    const name = starName.value;
    const id = starId.value;
    let statusMsg = "";

    try {
      await createStar(name, id).send({from: this.account});
      statusMsg = `Star named ${name} with ID ${id} is now owned by ${this.account}!`;
    }
    catch (error) {
      if(error.message.includes('token already minted')) {
        console.log(error);
        statusMsg = "Star ID already used create a Star, try using another Star ID!"
      }
      else {
        console.log(error);
        statusMsg = "Something went wrong! Try again later.";
      }
    }

    starName.value = "";
    starId.value = "";
    document.getElementById("cta-detail").classList.add("hideEle");
    document.getElementById("cta-status").classList.remove("hideEle");
    App.setStatus(statusMsg);

  },

  lookUp: async function () {
    const { lookUptokenIdToStarInfo } = this.meta.methods;
    const hiddenInput = document.getElementById("input1");
    const starId = document.getElementById("input2");
    const id = starId.value;
    let name = "";
    let statusMsg = "";

    name = await lookUptokenIdToStarInfo(id).call();
    if (name == "") {
      statusMsg = `Star with ID ${id} is yet to be minted!`;
    }
    else {
      statusMsg = `Star with ID ${id} is named ${name}.`;
    }

    starId.value = "";
    hiddenInput.classList.remove('hideEle');
    document.getElementById("cta-detail").classList.add("hideEle");
    document.getElementById("cta-status").classList.remove("hideEle");
    App.setStatus(statusMsg);
  },

  exchangeStars: async function () {
    const { ownerOf, exchangeStars } = this.meta.methods;
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    const starId1 = input1.value;
    const starId2 = input2.value;
    let statusMsg = "";

    try {
      let starId1Owner = await ownerOf(starId1).call();
      let starId2Owner = await ownerOf(starId2).call();
      statusMsg = `<p> Owner of Star ID ${starId1} is ${starId1Owner} and Owner of Star ID ${starId2} is ${starId2Owner}`;

      await exchangeStars(starId1, starId2).send({from: this.account});
      starId1Owner = await ownerOf(starId1).call();
      starId2Owner = await ownerOf(starId2).call();
      statusMsg += `<p> After exchange, \n Owner of Star ID ${starId1} is now ${starId1Owner} and Owner of Star ID ${starId2} is now ${starId2Owner}`;
    }
    catch(error) {
      console.log(error);
      statusMsg = `Something went wrong!`;
    }

    input1.value = "";
    input2.value = "";
    document.getElementById("cta-detail").classList.add("hideEle");
    document.getElementById("cta-status").classList.remove("hideEle");
    App.setStatus(statusMsg);
  },

  transferStar: async function() {
    const { ownerOf, transferStar } = this.meta.methods;
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");
    const toAddr = input1.value;
    const starId = input2.value;
    let statusMsg = "";

    try {
      await transferStar(toAddr, starId).send({from: this.account});
      let starOwner = await ownerOf(starId).call();
      if (starOwner == toAddr) {
        statusMsg = `Star ID ${starId} was successfully transfered to address ${toAddr}`;
      }
      else {
        throw('OwnerOf StarID does not match to ToAddress passed.');
      }
    }
    catch(error) {
      console.log(error);
      statusMsg = "Something went wrong!";
    }

    input1.value = "";
    input2.value = "";
    document.getElementById("cta-detail").classList.add("hideEle");
    document.getElementById("cta-status").classList.remove("hideEle");
    App.setStatus(statusMsg);
  }
}

window.App = App;

window.addEventListener("load", async function() {
  // if (window.ethereum) {
  //   // Use MetaMask's Provider
  //   App.web3 = new Web3(window.ethereum);
  //   await window.ethereum.enable(); // Get permission to access accounts
  // } else {
  //   console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
  //   // Fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  // }

  console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
  App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);

  App.start();

  document.getElementById("appIcon").href = appIcon;
});
