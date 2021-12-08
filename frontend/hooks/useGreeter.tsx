import { ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
import { CONTRACT_ADDRESSES } from '../utils/constants';

type Web3Props = {
  web3: providers.Web3Provider | undefined;
};

const useGreeter = ({ web3 }: Web3Props) => {
  const [address, setAddress] = useState<string>(CONTRACT_ADDRESSES.LOCAL);

  useEffect(() => {
    web3?.detectNetwork().then((network) => {
      const differentAddress: string = CONTRACT_ADDRESSES[network.name];
      if (differentAddress) {
        setAddress(differentAddress);
      } else {
        console.warn(`Contract address not found in network: ${network.name}`);
      }
    });
  }, [web3]);

  const fetchGreet = async () => {
    if (!web3) return;

    try {
      const contract = new ethers.Contract(address, Greeter.abi, web3);
      const greeting = await contract.greet();
      return greeting;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchSetName = async (name: string) => {
    if (!web3) return;
    if (!name) throw new Error('Invalid param');

    const signer = web3.getSigner();
    const contract = new ethers.Contract(address, Greeter.abi, signer);
    const transaction = await contract.setName(name);
    await transaction.wait();
  };

  return [fetchGreet, fetchSetName] as const;
};

export default useGreeter;
