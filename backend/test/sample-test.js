const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("you");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello you");

    const setNameTx = await greeter.setName("Nico");

    // wait until the transaction is mined
    await setNameTx.wait();

    expect(await greeter.greet()).to.equal("Hello Nico");
  });
});
