import React, { useEffect, useRef, useState } from 'react';
import { providers, utils } from 'ethers';
import useNetwork from '../hooks/useNetwork';
import useGreeter from '../hooks/useGreeter';
import CommonSpinner from '../components/CommonSpinner';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [greeting, setGreeting] = useState<string>('');

  const [network, setNetwork] = useState<providers.Network>();
  const [account, setAccount] = useState<string>('');
  const [userBalance, setUserBalance] = useState<string>('');

  const [{ web3 }, handleNetwork] = useNetwork();
  const [fetchGreet, fetchSetName] = useGreeter({ web3 });

  useEffect(() => {
    if (typeof web3 === 'undefined') {
      resetFields();
    } else {
      setNetworkAccount(web3);
    }
  }, [web3]);

  const setNetworkAccount = async (web3: providers.Web3Provider) => {
    web3.detectNetwork().then(setNetwork).catch(setErrorMessage);
    const accounts = await web3.listAccounts();
    setAccount(accounts[0]);

    const { _hex } = await web3.getBalance(accounts[0]);
    setUserBalance(utils.formatEther(_hex));
  };

  const resetFields = () => {
    setNetwork(undefined);
    setAccount('');
    setUserBalance('');
    setGreeting('');
  };

  const handleConnect = () => {
    handleNetwork().catch(setErrorMessage);
  };

  const getGreeting = async () => {
    setIsLoading(true);

    try {
      const fetchedGreeting = await fetchGreet();
      setGreeting(fetchedGreeting);
      setIsLoading(false);
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
      setIsLoading(false);
    }
  };

  const handleSetName = () => {
    if (inputRef?.current) {
      fetchSetName(inputRef.current?.value)
        .then(() => fetchGreet())
        .catch((err) => setErrorMessage(err.message));
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

      <button onClick={getGreeting}>Get greeting</button>
      {isLoading ? <CommonSpinner /> : <div>{greeting}</div>}
      <button onClick={handleSetName}>Set Greeting</button>
      <input ref={inputRef} placeholder="Placeholder" />
    </div>
  );
};

export default Home;
