const {  loadFixture }= require ("@nomicfoundation/hardhat-network-helpers");
const { ethers } =require ("hardhat");

const fractionalToBn =(num, decimals) =>{
    if (decimals > 9) {
        return ethers.BigNumber.from(parseInt(`${parseFloat(num) * 10 ** 9}`)).mul(ethers.BigNumber.from(10).pow(decimals - 9))
    }
    return ethers.BigNumber.from(parseInt(`${parseFloat(num) * 10 ** decimals}`))
}

describe("StreamPay", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function createSteamPay() {
  
    const [owner, otherAccount] = await ethers.getSigners();

    const StreamPay = await ethers.getContractFactory("StreamPay");
    const streamPay = await StreamPay.deploy();

    return { streamPay, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const price= fractionalToBn(0.1, 18);
      const { streamPay, owner,otherAccount } = await loadFixture(createSteamPay);
    streamPay.createStream(0x46b6F87DeBD8f7607d00Df47C31D2dC6D9999999,price,0x97cb342Cf2F6EcF48c1285Fb8668f5a4237BF862,1666666800,1666674000);
      
    });


  });


});
