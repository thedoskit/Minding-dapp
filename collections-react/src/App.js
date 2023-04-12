import React, { useState } from 'react';
import "./App.css";
import "./bgrd.scss";
import { Contract, ethers } from "ethers";
import { useEffect } from "react";
import contractABI from "./contractABI.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MintingPage from "./MintingPage";
import ExplorePage from "./ExplorePage";

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
    function initNFTContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(contractAddress, contractABI.abi, signer));
    }
    if (account) {
      initNFTContract();
    }
  }, [account]);

  async function connectWallet() {
    window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then((accounts) => {
      setAccount(accounts[0]);
    })
    .catch((error) => {
      alert("Something went wrong");
    });
  }

  async function handleMint(tokenId) {
    setIsMinting(true);
    try {
      const tx = await NFTContract.mint(tokenId);
      await tx.wait();
      setIsMinting(false);
      alert("Minted Successfully");
    } catch (error) {
      setIsMinting(false);
      alert("Something went wrong");
    }
  }

  async function withdrawMoney() {
    try {
      const response = await NFTContract.withdraw();
      await response.wait();
      alert("Money Withdrawn Successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <div className="landingpage">
              <div className="navbar">
              <Link to="/" className="navlogo">DOSKIT</Link>

                <button className="hamburger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="feather feather-menu"
                  >
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </button>
                <div className="buttonwrap">
                  <button className="createbtn selectedbtn" onClick={() => MintingPage()}>
                    CREATE
                  </button>
                </div>
              </div>
              <div className="box">
                <div className="infobox">
                  <p className="infobox-boldtext">
                    Discover, collect, and charity in extraordinary NFT marketplace
                  </p>
                  <p className="infobox-slimtext">
                    In aenean posuere lorem risus nec. Tempor tincidunt aenean purus purus vestibulum nibh mi venenatis
                  </p>
                  <div className="infobox-btnwrapper">
                    <button className="infobox-explorebtn" onClick={() => ExplorePage()}>
                      EXPLORE
                    </button>
                    <button className="infobox-connectbtn" onClick={() => connectWallet()}>
                      CONNECT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </header>
          <Route path="/mint" render={() => <MintingPage handleMint={handleMint} isMinting={isMinting} />} />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/" exact render={() => <div className="App-landingpage"><p>Welcome to the Landing Page</p></div>} />
      </div>
    </Router>
  );
  
  }

export default App;
