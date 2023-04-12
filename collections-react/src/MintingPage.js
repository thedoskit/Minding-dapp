import React, { useState } from 'react';
import "./App.css";
import "./bgrd.scss";
import { Contract, providers, ethers } from "ethers";
import { useEffect } from "react";
import contractABI from "./contractABI.json";

const contractAddress = "0xF87e27a445dc63E53f29097Be8bCe87FDc190551";

function App() {
const [account, setAccount] = useState(null);
const [isWalletInstalled, setIsWalletInstalled] = useState(false);
const [NFTContract, setNFTContract] = useState(null);
const [isMinting, setIsMinting] = useState(false);

useEffect(() => {
if (window.ethereum) {
setIsWalletInstalled(true);
}
}, []);

useEffect(() => {
async function initNFTContract() {
const provider = new providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
setNFTContract(new Contract(contractAddress, contractABI, signer));
}
if (account) {
initNFTContract();
}
}, [account]);

async function connectWallet() {
try {
const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
setAccount(accounts[0]);
} catch (error) {
alert("Something went wrong");
}
}

const data = [
    {
      url: "./assets/images/1.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmVQwbyaW5gaXz6MHsxNVk7QoA5dgFZe2dBVtjZ4mXYKG1/1')",
    },
    {
      url: "./assets/images/2.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmVQwbyaW5gaXz6MHsxNVk7QoA5dgFZe2dBVtjZ4mXYKG1/2')",
    },
    {
      url: "./assets/images/3.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmVQwbyaW5gaXz6MHsxNVk7QoA5dgFZe2dBVtjZ4mXYKG1/3')",
    },
    {
      url: "./assets/images/4.png",
      param: "handleMint('https://gateway.pinata.cloud/ipfs/QmVQwbyaW5gaXz6MHsxNVk7QoA5dgFZe2dBVtjZ4mXYKG1/4')",
    },
  
  {
  url: "./assets/images/5.png",
  param: "handleMint('https://gateway.pinata.cloud/ipfs/QmVQwbyaW5gaXz6MHsxNVk7QoA5dgFZe2dBVtjZ4mXYKG1/5')",
  },
  ];

async function handleMint(tokenURI) {
    setIsMinting(true);
    try {
      const options = { value: ethers.utils.parseEther("0.01") };
      const response = await NFTContract.mintNFT(tokenURI, options);
      console.log("Received: ", response);
    } catch (err) {
      alert(err);
    } finally {
      setIsMinting(false);
    }
  }
  if (account === null) {
    return (
      <div className="App">
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    );
  } else if (isMinting) {
    return (
      <div className="App">
        <p>Minting in progress...</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="data-container">
          {data.map((item, index) => {
            return (
              <div key={index} className="data-item">
                <img src={item.url} alt="NFT" onClick={() => handleMint(item.param)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  }
  

function MintingPage({ handleMint, isMinting }) {
const [tokenId, setTokenId] = useState('');



return (
    <div className="App">
    <MintingPage handleMint={handleMint} isMinting={isMinting} />
    </div>
    );
  }

export default App;
