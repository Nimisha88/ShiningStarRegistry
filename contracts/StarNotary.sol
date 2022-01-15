// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {
  constructor(string memory _name, string memory _symbol)
  ERC721(_name, _symbol) {
    // Call parent constructor
  }

  struct Star {
    string name;
  }

  mapping(uint256 => Star) public tokenIdToStarInfo;
  mapping(uint256 => uint256) public starsForSale;

  // Create Star using the Struct
  function createStar(string memory _name, uint256 _tokenId) public {
    Star memory newStar = Star(_name);
    tokenIdToStarInfo[_tokenId] = newStar;
    _mint(msg.sender, _tokenId);
  }

  // Look up the Star Name using the Token ID
  function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns (string memory){
    Star memory lookedUpStar = tokenIdToStarInfo[_tokenId];
    return lookedUpStar.name;
  }

  // Exchange Star Between Users
  function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
    address owner1 = ownerOf(_tokenId1);
    address owner2 = ownerOf(_tokenId2);
    require(owner1 == msg.sender || owner2 == msg.sender, "You cannot exchange Stars if you dont own either of them!");
    _transfer(owner1, owner2, _tokenId1); // Change Ownership of Star 1
    _transfer(owner2, owner1, _tokenId2); // Change Ownership of Star 2
  }

  // Transfer a Star
  function transferStar(address _to, uint256 _tokenId) public {
    address starOwner = ownerOf(_tokenId);
    require(starOwner == msg.sender, "You cannot transfer a Star that you dont own!");
    _transfer(starOwner, _to, _tokenId);
  }
}
