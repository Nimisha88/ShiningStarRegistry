const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can add a Star Name and Star Symbol properly', async() => {
  let instance = await StarNotary.deployed();
  assert.equal(await instance.name(), 'ShiningStarRegistry');
  assert.equal(await instance.symbol(), 'SSR');
});

it('can Create a Star', async() => {
  let tokenId = 1;
  let instance = await StarNotary.deployed();
  await instance.createStar('Alpha', tokenId, {from: owner});
  assert.equal(await instance.lookUptokenIdToStarInfo.call(tokenId), 'Alpha');
});

it('lets 2 users exchange stars', async() => {
  let instance = await StarNotary.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let star1 = 2;
  let star2 = 3;
  await instance.createStar('Beta', star1, {from: user1});
  await instance.createStar('Gamma', star2, {from: user2});
  await instance.exchangeStars(star1, star2, {from: user1});
  assert.equal(await instance.ownerOf(star1), user2);
  assert.equal(await instance.ownerOf(star2), user1);
});

it('lets a user transfer a star', async() => {
  let instance = await StarNotary.deployed();
  let tokenId = 4;
  let sendTo = accounts[1];
  await instance.createStar('Delta', tokenId, {from: owner});
  await instance.transferStar(sendTo, tokenId, {from: owner});
  assert.equal(await instance.ownerOf(tokenId), sendTo);
});
