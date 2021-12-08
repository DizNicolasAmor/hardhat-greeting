import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    // options: {
    // infuraId: process.env.REACT_APP_INFURA_ID,
    // },
  },
};

function useNetwork() {
  const [provider, setProvider] = useState<any>();
  const [web3, setWeb3] = useState<providers.Web3Provider>();
  let web3Modal: Web3Modal | undefined;

  const connect = async () => {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });

    const tempProvider = await web3Modal.connect();
    setProvider(tempProvider);

    const tempWeb3 = new providers.Web3Provider(tempProvider);
    setWeb3(tempWeb3);
  };

  const disconnect = async () => {
    // close provider when walletconnect is used
    if (provider && provider.close) {
      await provider.close();
    }
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }

    setProvider(undefined);
    setWeb3(undefined);
  };

  const handleNetwork = async () => {
    if (!web3) {
      await connect();
    } else {
      await disconnect();
    }
  };

  return [{ web3 }, handleNetwork] as const;
}

export default useNetwork;
