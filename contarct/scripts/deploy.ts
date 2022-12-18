import { ethers } from "hardhat";

async function main() {
  // const Marketplace = await ethers.getContractFactory('OwlandoMarketplace')
  // const _marketplace = await Marketplace.deploy()
  // await _marketplace.deployed()

  // const Owlando = await ethers.getContractFactory("Owlando4907");
  // const _owlando = await Owlando.deploy(_marketplace.address);
  // await _owlando.deployed();

  // console.log("Owlando Contract Address:", _marketplace.address);
  // console.log("Owlando NFT Contract deployed to:", _owlando.address);


  const Token = await ethers.getContractFactory('Token');
  const _token = await Token.deploy();
  await _token.deployed();
  console.log("Token Contract deployed to:", _token.address);

  const StreamPay= await ethers.getContractFactory("StreamPay");
  const _streamPay = await StreamPay.deploy();
  await _streamPay.deployed();
  console.log("StreamPay Contract deployed to:", _streamPay.address);

  const Owlad= await ethers.getContractFactory("Owlad");
  const _owlad = await Owlad.deploy( _streamPay.address, _token.address);
  await _owlad.deployed();
  console.log("Owlad Contract deployed to:", _owlad.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
