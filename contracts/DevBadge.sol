// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {
    ERC721URIStorage
} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DevBadge is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public constant MINT_PRICE = 0.001 ether;
    uint256 public constant MAX_SUPPLY = 100;
    string public BASE_URI;

    mapping(address => bool) public hasMinted;

    constructor(
        string memory baseURI
    ) ERC721("DevBadge", "DBDG") Ownable(msg.sender) {
        BASE_URI = baseURI;
    }

    error ExceedsMintLimit();
    error AlreadyMinted();
    error InsufficientPayment(uint256 required, uint256 provided);
    error TransferFailed();

    event TokenMinted(address indexed to, uint256 tokenId);

    function safeMint() external payable {
        uint256 tokenId = _nextTokenId++;
        if (tokenId >= MAX_SUPPLY) revert ExceedsMintLimit();
        if (hasMinted[msg.sender]) revert AlreadyMinted();
        if (msg.value != MINT_PRICE)
            revert InsufficientPayment(MINT_PRICE, msg.value);
        hasMinted[msg.sender] = true;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, BASE_URI);
        emit TokenMinted(msg.sender, tokenId);
    }

    function withdraw() external onlyOwner {
        (bool s, ) = msg.sender.call{value: address(this).balance}("");
        require(s, TransferFailed());
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
