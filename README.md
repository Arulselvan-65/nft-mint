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
| Contract Address | `0x55F900d05b274b3548B78E79CE8761d32F5692f4` |
| Max Supply | 100 DBDG |
| Mint Price | 0.001 ETH |
| Standard | ERC-721 |

[View on Etherscan](https://etherscan.io/address/0x55F900d05b274b3548B78E79CE8761d32F5692f4)

[View on Sourcify](https://repo.sourcify.dev/11155111/0x55F900d05b274b3548B78E79CE8761d32F5692f4)


