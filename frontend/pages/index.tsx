import React, { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

const Home = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [defaultAccount, setDefaultAccount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const connectWalletHandler = () => {
    const hasMetaMask: boolean = window.ethereum && window.ethereum.isMetaMask;
    if (!hasMetaMask) {
      setErrorMessage('Need to install MetaMask');
      return;
    }
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((result: string[]) => {
        accountChangedHandler(result[0]);
        setConnButtonText('Wallet Connected');
        getAccountBalance(result[0]);
      })
      .catch((error: unknown) => {
        console.error(error);
        setErrorMessage('Error connecting MetaMask');
      });
  };

  const accountChangedHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = (account: string) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance: string) => {
        const formatedBalance: string = ethers.utils.formatEther(balance);
        setUserBalance(formatedBalance);
      })
      .catch((error: unknown) => {
        console.error(error);
        setErrorMessage('Error getting balance');
      });
  };

  return (
    <div>
      <h1>Greeter dApp</h1>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>Address: {defaultAccount}</div>
      <div>Balance: {userBalance}</div>
      <div aria-live="assertive" aria-atomic="true">
        {errorMessage}
      </div>
    </div>
  );
};

export default Home;
