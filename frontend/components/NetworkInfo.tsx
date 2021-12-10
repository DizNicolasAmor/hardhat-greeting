import React from 'react';
import { providers } from 'ethers';
import { Button } from 'react-bootstrap';

interface INetworkInfo {
  account: string;
  handleConnect: () => void;
  network: providers.Network | undefined;
  userBalance: string;
  web3: providers.Web3Provider | undefined;
}

const NetworkInfo: React.FC<INetworkInfo> = ({
  handleConnect,
  web3,
  network,
  account,
  userBalance,
}) => (
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

export default NetworkInfo;
