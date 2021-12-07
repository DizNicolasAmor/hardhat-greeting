import React, { useEffect, useRef, useState } from 'react';
import { providers } from 'ethers';
import useNetwork from '../hooks/useNetwork';
import useGreeter from '../hooks/useGreeter';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

const Home = () => {
  const [network, setNetwork] = useState<providers.Network>();
  const [account, setAccount] = useState<string>();
  const [errorMessage, setErrorMessage] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [greeting, setGreeting] = useState('');

  const [{ web3 }, handleNetwork] = useNetwork();
  const [fetchGreet, fetchSetName] = useGreeter({ web3 });

  useEffect(() => {
    if (typeof web3 === 'undefined') {
      resetFields();
    } else {
      const setNetworkAccount = async () => {
        web3.detectNetwork().then(setNetwork).catch(setErrorMessage);
        web3
          .listAccounts()
          .then((accounts) => {
            setAccount(accounts[0]);
          })
          .catch(setErrorMessage);
      };
      setNetworkAccount();
    }
  }, [web3]);

  const resetFields = () => {
    setNetwork(undefined);
    setAccount('');
    setGreeting('');
  };

  /*
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
  */

  const handleConnect = () => {
    handleNetwork().catch(setErrorMessage);
  };

  const getGreeting = () => {
    fetchGreet().then(setGreeting).catch(setErrorMessage);
  };

  const handleSetName = () => {
    if (inputRef.current) {
      fetchSetName(inputRef.current.value)
        .then(() => fetchGreet())
        .catch(setErrorMessage);
    }
  };

  return (
    <div>
      <h1>Greeter dApp</h1>
      <button onClick={handleConnect}>{web3 ? 'Disconnect' : 'Connect'}</button>
      <div>
        Network: {network?.chainId} {network?.name}
      </div>
      <div>Address: {account}</div>
      <div>Balance: {userBalance}</div>
      <div aria-live="assertive" aria-atomic="true">
        {errorMessage}
      </div>

      <button onClick={getGreeting}>GET GREETING FROM SMART CONTRACT</button>
      <div>{greeting}</div>
      <button onClick={handleSetName}>Set Greeting</button>
      <input ref={inputRef} placeholder="Set greeting" />
    </div>
  );
};

export default Home;
