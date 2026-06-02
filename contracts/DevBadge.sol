// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DevBadge is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public constant MINT_PRICE = 0.001 ether; 
    int8 public constant MAX_SUPPLY = 100; 

    mapping(address => bool) public hasMinted;

    constructor(address initialOwner)
        ERC721("DevBadge", "DBDG")
        Ownable(initialOwner)
    {}

    error ExceedsMintLimit();
    error AlreadyMinted();
    event TokenMinted(address indexed to, uint256 tokenId);

    function safeMint(address to, string memory uri) external {
        uint256 tokenId = _nextTokenId++;
        require(!hasMinted[msg.sender], AlreadyMinted());
        if(tokenId > 100) revert ExceedsMintLimit();
        hasMinted[msg.sender] = true;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit TokenMinted(to, tokenId);
    }

    function withdraw() external onlyOwner {
        (bool s, ) = msg.sender.call{value: address(this).balance}("");
        require(s, "Transfer Failed");
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
