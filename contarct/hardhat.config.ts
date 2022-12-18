import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// require("dotenv").config({ path: "./.env" });

//0x9f1947830111d3a5f86859bcfb8003a703cf263c 84eaf826371fd44e16a621db4a93407df9324fc56ba5c6579f5c3d5d03481ec8
const GOERLI_PRIVATE_KEY='84eaf826371fd44e16a621db4a93407df9324fc56ba5c6579f5c3d5d03481ec8';
const config: HardhatUserConfig = {
  
  solidity: "0.8.9",
  paths: {
    artifacts: './artifacts',
  },
  networks:{
    local:{
      url: `http://localhost:8545`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/49a4edfed12847159bc19c3201d4f45c`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    mumbai:{
      url: `https://polygon-testnet.public.blastapi.io`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    arbitrum:{
      url: `https://nova.arbitrum.io/rpc`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    findora:{
      url: `https://testnet.findora.org/rpc`,
      accounts: [GOERLI_PRIVATE_KEY]
    },
    trustEVM:{
      url: `https://api.testnet-dev.trust.one`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

export default config;
