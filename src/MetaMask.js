import React, { useState } from 'react';
import { ethers } from 'ethers';
import "./App.css"

const Metamask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      try {
        window.ethereum.request({ method: 'eth_requestAccounts' }) // Corrected method name
          .then(result => {
            accountChanged(result[0]);
          })
          .catch(error => {
            setErrorMessage('Failed to connect wallet');
            console.error('Error connecting wallet:', error);
          });
      } catch (error) {
        setErrorMessage('Error while connecting wallet');
        console.error('Error connecting wallet:', error);
      }
    } else {
      setErrorMessage('Install MetaMask');
    }
  };
   const accountChanged = accountName => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);

  };


  const getUserBalance = (accountAddress) => {
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
    .then(balance => {
      setUserBalance(ethers.formatEther(balance));
    })
  };




  return (
    <div>
      <p>Check your MetaMask Balance</p>
      <button className="button" onClick={connectWallet}>Connect Wallet</button>
      <h3>Address: {defaultAccount}</h3>
      <h3>Balance: {userBalance} ETH</h3>
      {errorMessage && <p>{errorMessage}</p>} 
    </div>
  );
};

export default Metamask;
