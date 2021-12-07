import React, { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';

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

  const [greeting, setGreeting] = useState('');

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState('');
  const [contract, setContract] = useState(null);

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
    updateEthers();
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

  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const updateEthers = () => {
    const tempProvider: any = new ethers.providers.Web3Provider(
      window.ethereum
    );
    setProvider(tempProvider);

    const tempSigner: any = tempProvider.getSigner();
    setSigner(tempSigner);

    const tempContract: any = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      tempSigner
    );
    setContract(tempContract);

    console.log({ tempProvider, tempContract, tempSigner });
  };

  const getGreeting = async () => {
    const internalGreeting = await contract.greet();
    setGreeting(internalGreeting);
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

      <button onClick={getGreeting}>GET GREETING FROM SMART CONTRACT</button>
      <div>{greeting}</div>
    </div>
  );
};

export default Home;
