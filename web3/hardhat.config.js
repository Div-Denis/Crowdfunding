/** @type import('hardhat/config').HardhatUserConfig */
const {PRIVATE_KEY, ALCHEMY_URL_KEY} = process.env;
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork:'goerli',
    networks:{
      hardhat:{},
      goerli:{
        url: ALCHEMY_URL_KEY,
        accounts:[`0x${PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
