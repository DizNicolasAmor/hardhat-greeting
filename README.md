### Connecting a wallet or Dapp to Hardhat Network

Hardhat will always spin up an in-memory instance of Hardhat Network on startup by default. It's also possible to run Hardhat Network in a standalone fashion so that external clients can connect to it. This could be MetaMask, your Dapp front-end, or a script.

To run Hardhat Network in this way, run npx hardhat node:

```
$ npx hardhat node
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

This will expose a JSON-RPC interface to Hardhat Network. To use it connect your wallet or application to http://localhost:8545.

If you want to connect Hardhat to this node to, for example, run a deployment script against it, you simply need to run it using --network localhost.

To try this, start a node with npx hardhat node and re-run the sample script using the network option:

```
npx hardhat run scripts/sample-script.js --network localhost
```

Congrats! You have created a project, run a Hardhat task, compiled a smart contract, installed a Waffle integration plugin, written and run a test using the Waffle and ethers.js plugins, and deployed a contract.

Docs: https://hardhat.org/getting-started/
