import React, { useEffect, useRef, useState } from 'react';
import { providers, utils } from 'ethers';
import useNetwork from '../hooks/useNetwork';
import useGreeter from '../hooks/useGreeter';
import CommonSpinner from '../components/CommonSpinner';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [isLoadingGreet, setIsLoadingGreet] = useState<boolean>(false);
  const [isLoadingSetName, setIsLoadingSetName] = useState<boolean>(false);
  const [isFetchNameSuccess, setIsFetchNameSuccess] = useState<boolean>(false);
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
    setErrorMessage('');
    setIsLoadingGreet(true);

    try {
      const fetchedGreeting = await fetchGreet();
      setGreeting(fetchedGreeting);
      setIsLoadingGreet(false);
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
      setIsLoadingGreet(false);
    }
  };

  const handleSetName = async () => {
    if (!inputRef?.current) return;

    setErrorMessage('');
    setIsLoadingSetName(true);

    try {
      await fetchSetName(inputRef.current?.value);
      setIsFetchNameSuccess(true);
      setIsLoadingSetName(false);
    } catch (reason) {
      console.error(reason);
      setErrorMessage('Error when fetching contract');
      setIsLoadingSetName(false);
    }
  };

  const renderTitle = () => <h1 className="m-3">Greeter dApp</h1>;

  const renderNetworkInfo = () => (
    <>
      <Button className="m-3" variant="primary" onClick={handleConnect}>
        {web3 ? 'Disconnect' : 'Connect'}
      </Button>

      <div className="m-3">
        <div>
          <strong>Network: </strong>
          {network?.chainId} {network?.name}
        </div>
        <div>
          <strong>Address: </strong>
          {account}
        </div>
        <div>
          <strong>Balance:</strong>
          {userBalance}
        </div>
      </div>
    </>
  );

  const renderGreeterSection = () => (
    <>
      <Button className="m-3" variant="secondary" onClick={getGreeting}>
        Get greeting
      </Button>
      {isLoadingGreet ? <CommonSpinner /> : <div>{greeting}</div>}

      <Button className="m-3" variant="secondary" onClick={handleSetName}>
        Set Greeting
      </Button>
      <div>
        <input ref={inputRef} placeholder="Your name" />
      </div>
      {isLoadingSetName && <CommonSpinner />}
      {isFetchNameSuccess && (
        <div
          className="text-center p-3 text-danger"
          aria-live="assertive"
          aria-atomic="true"
        >
          Name updated
        </div>
      )}
      <div
        className="text-center p-3 text-danger"
        aria-live="assertive"
        aria-atomic="true"
      >
        {errorMessage}
      </div>
    </>
  );

  return (
    <div className="text-center">
      {renderTitle()}
      {renderNetworkInfo()}
      {renderGreeterSection()}
    </div>
  );
};

export default Home;
