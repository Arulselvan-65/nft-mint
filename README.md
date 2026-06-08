# DevBadge NFT

A Web3 NFT minting application for the DevBadge (DBDG) collection - a soulbound badge for Web3 learners deployed on the Ethereum Sepolia testnet.

🔗 **Live Demo**: [dev-badge-nft.vercel.app](https://dev-badge-nft.vercel.app)

---

## Overview

DevBadge is a limited NFT collection of 100 badges representing Web3 learners. Each wallet can mint exactly one badge. Once minted, the badge is **non-transferable** - it stays with the wallet that earned it, making it a true on-chain identity badge.

---

## Features

- Connect wallet
- Mint a DevBadge NFT for 0.001 ETH
- One badge per wallet - enforced on-chain
- Non-transferable (soulbound) token
- View your minted badge with Etherscan link
- Owner can withdraw collected ETH
- Metadata stored on IPFS via Pinata

---
## Tech Stack

| Layer | Tool |
|---|---|
| Smart Contract | Solidity ^0.8.28 |
| Contract Framework | Hardhat |
| Contract Library | OpenZeppelin |
| Frontend | Next.js + React |
| Web3 Library | ethers.js |
| Wallet | MetaMask |
| Metadata Storage | IPFS via Pinata |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- Sepolia testnet ETH ([faucet](https://sepolia-faucet.pk910.de/))

### Installation

```bash
# Clone the repo
git clone https://github.com/Arulselvan-65/nft-mint
cd nft-mint

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Run locally

```bash
# In frontend/
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and connect your MetaMask wallet on Sepolia.

### Run tests

```bash
# In project root
npx hardhat test
```

---

## Project Structure

```
nft-mint/
├── contracts/
│   └── DevBadge.sol
├── test/
│   └── DevBadge.test.js
├── frontend/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── providers.tsx
│       └── components/
│           ├── Navbar/
│           ├── NFTInfo/
│           ├── TransactionModal/
│           └── WalletInfo/
└── hardhat.config.js
```

---

## How It Works

1. Connect your MetaMask wallet on Sepolia
2. Click **Mint Now** and confirm the transaction (0.001 ETH)
3. Your DevBadge NFT is minted to your wallet
4. The badge is soulbound - it cannot be transferred to another wallet
5. View your badge and transaction on Etherscan

---

# DevBadge Contract

DevBadge is a soulbound ERC721 NFT badge with a fixed maximum supply, one-per-wallet minting, and a fixed mint price.

## Features

- ERC721 NFT
- ERC721URIStorage metadata support
- Ownable access control
- Fixed mint price (0.001 ETH)
- Maximum supply limit (100)
- One mint per wallet
- Non-transferable (Soulbound)
- Custom errors
- TokenMinted event emission

## Functions

### safeMint

```solidity
function safeMint() external payable
```

Mints a new DevBadge NFT to the caller.

Requires exactly `0.001 ether` payment. Only one mint is allowed per address. Reverts if the max supply of 100 has been reached.

### withdraw

```solidity
function withdraw() external onlyOwner
```

Withdraws all ETH balance from the contract to the owner.

Only owner can call this function.

---

## Events

```solidity
event TokenMinted(address indexed to, uint256 tokenId);
```

Emitted when a new badge is successfully minted.

---

## Errors

```solidity
error ExceedsMintLimit();
error AlreadyMinted();
error TransferFailed();
error NonTransferable();
error InsufficientPayment(uint256 required, uint256 provided);
```

- `ExceedsMintLimit` → Mint exceeds the max supply of 100
- `AlreadyMinted` → Address has already minted a NFT
- `TransferFailed` → ETH transfer failed during withdrawal
- `NonTransferable` → Token cannot be transferred (soulbound badge)
- `InsufficientPayment` → ETH sent does not match the required `0.001 ether`

---

## Tests Covered

- Contract deployment
- Token minting with correct payment
- Insufficient payment rejection
- One mint per address restriction
- Max supply validation
- Non-transferability enforcement
- Owner withdrawal
- Event emission
- Error handling

---

## Contract

| Property | Value |
|---|---|
| Token Name | DevBadge |
| Symbol | DBDG |
| Network | Ethereum |
| Contract Address | `0x8e21660328ed2aad792FcA27737f8321aACe3948` |
| Max Supply | 100 DBDG |
| Mint Price | 0.001 ETH |
| Standard | ERC-721 |

[View on Etherscan](https://sepolia.etherscan.io/address/0x8e21660328ed2aad792FcA27737f8321aACe3948)

[View on Sourcify](https://repo.sourcify.dev/11155111/0x8e21660328ed2aad792FcA27737f8321aACe3948)


