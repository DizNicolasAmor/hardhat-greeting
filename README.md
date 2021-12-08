# Hardhat-greeting

This is a basic greeting app built with Hardhat and ReactJS.

**How it works**

There is a Smart contract in the backend that stores a `name`. This name could be updated with `setName` method. Also, there is a `greet` method that return a string that is a greeting that includes that name.

In the frontend, the user can fetch those methods.

## Requirements

- **node** and **npm**

## Setup

### Set up backend locally with Hardhat Network

```
# first, go to backend directory
$ cd backend/

# second, if it is the first time, install dependencies
$ npm ci

# third, run a Hardhat Network local node
$ npx hardhat node
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

# fourth, in a different console, run the deploy script against this local node
npx hardhat run scripts/sample-script.js --network localhost
```

Docs: https://hardhat.org/getting-started/

### Set up MetaMask to connect this local node

Add a network in your MetaMask settings with the following configuration:

```
Network name: LOCALHOST
NEW RPC URL: http://127.0.0.1:8545
Chain ID: 31337
```

### Set up frontend with ReactJS

```
# first, go to the frontend directory
$ cd frontend/

# second, if it is the first time, install dependencies
$ npm ci

# third, run frontend
$ npm run dev
```
