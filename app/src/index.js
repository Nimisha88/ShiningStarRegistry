import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";
import "./styles.css";
import appIcon from './assets/icon.png';

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;
    try {
      // console.log(web3);

      // Get Accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      // console.log(this.account);

      // Get Contract Instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      // console.log(networkId);
      // console.log(starNotaryArtifact);
      // console.log(deployedNetwork);

      this.meta = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
        // {from: this.account, gasPrice: 20000000, gas: 30000}
        {from: this.account}
      );
    }
    catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  getCreateStarDetails: function() {
    const ctaContent = document.getElementById("cta-content");
    const ctaDetail = document.getElementById("cta-detail");
    ctaContent.classList.add("hideEle");
    ctaDetail.classList.remove("hideEle");
  },

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const starName = document.getElementById("starName");
    const starId = document.getElementById("starId");
    const name = starName.value;
    const id = starId.value;
    let statusMsg = "";

    try {
      await createStar(name, id).send({from: this.account});
      statusMsg = `Star named ${name}, ID ${id}, is now owned by ${this.account}!`;
    }
    catch (error) {
      if(error.message.includes('token already minted')) {
        statusMsg = "Star ID already used create a Star, try using another Star ID!"
      }
      else {
        statusMsg = "Something went wrong! Try again later.";
      }
    }

    starName.value = "";
    starId.value = "";
    document.getElementById("cta-detail").classList.add("hideEle");
    document.getElementById("cta-status").classList.remove("hideEle");
    App.setStatus(statusMsg);

  },

  showMenu: async function() {
    const status = document.getElementById("status");
    status.innerHTML = "";
    document.getElementById("cta-status").classList.add("hideEle");
    document.getElementById("cta-content").classList.remove("hideEle");
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
