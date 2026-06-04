const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DevBadge", function () {
  async function deployDevBadgeFixture() {
    const tokenURI = "https://ipfs.io/ipfs/bafkreibckfqyifkptko6azgni6ioaxrlbdmc5koa4q2g4qffec523qykyi";
    const [owner, otherAccount] = await ethers.getSigners();
    const DevBadge = await ethers.getContractFactory("DevBadge");
    const contract = await DevBadge.deploy(tokenURI);
    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right token name", async function () {
      const { contract } = await loadFixture(deployDevBadgeFixture);
      expect(await contract.name()).to.equal("DevBadge");
    });

    it("Should set the right token symbol", async function () {
      const { contract } = await loadFixture(deployDevBadgeFixture);
      expect(await contract.symbol()).to.equal("DBDG");
    });

    it("Should set the correct owner", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      expect(await contract.owner()).to.equal(owner);
    });
  });

  describe("Mint", function () {
    it("Should allow everyone to mint NFT", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      expect(await contract.balanceOf(owner.address)).to.equal(1);
    });

    it("Should assign the correct token ID to the minted NFT", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      expect(await contract.ownerOf(0)).to.equal(owner.address);
    });

    it("Should throw InsufficientPayment if the user does not send enough ETH for minting.", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      expect(contract.safeMint())
        .to
        .revertedWithCustomError(contract, "InsufficientPayment")
        .withArgs(ethers.parseEther("0.001"), 0);
    });

    it("Should throw AlreadyMinted if the user already minted the NFT", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      expect(contract.safeMint())
        .to
        .revertedWithCustomError(contract, "AlreadyMinted");
    });

    it("Should throw ExceedsMintLimit when the maximum supply is reached", async function () {
      const { contract, owner } = await loadFixture(deployDevBadgeFixture);
      for (var i = 0; i <= 99; i++) {
        const wallet = ethers.Wallet.createRandom().connect(ethers.provider);

        await owner.sendTransaction({
          to: wallet.address,
          value: ethers.parseEther("1"),
        });

        await contract.connect(wallet).safeMint({ value: await contract.MINT_PRICE() });
      }
      expect(contract.safeMint())
        .to
        .revertedWithCustomError(contract, "ExceedsMintLimit");
    });
  });

  describe("Withdraw", function () {
    it("Should allow the owner to withdraw the contract balance", async function () {
      const { contract } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      expect(await contract.withdraw()).to.changeEtherBalance(0);
    });

    it("Should allow owner to withdraw all the contract balance", async function () {
      const { contract } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      await contract.withdraw()
      expect(await ethers.provider.getBalance(contract.target)).to.equal(0);
    });

    it("Should throw OwnableUnauthorizedAccount when users try to withdraw", async function () {
      const { contract, otherAccount } = await loadFixture(deployDevBadgeFixture);
      await contract.safeMint({ value: await contract.MINT_PRICE() });
      expect(contract.connect(otherAccount).withdraw())
        .to
        .revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
        .withArgs(otherAccount.address);
    });
  });
});
