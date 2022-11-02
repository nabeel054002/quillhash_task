const {lines} = require("webscrape.js");
console.log(lines);












// const axios = require('axios');
// const {ethers} = require('ethers');

// const address = '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844';
// const apiKey='YSFTZMCRI88STDFR4BWJD3EG5R8H7SNR4Z';
// const url='https://api-goerli.etherscan.io/api?module=contract&action=getabi&address='+address+'&apikey='+apiKey;
// const infuraUrl = 'https://goerli.infura.io/v3/27efac9249c54c20b2c98fd6fde3f5e4';

// const getAbi = async()=>{
//     const res = await axios.get(url);
//     const abi = JSON.parse(res.data.result);
//     const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
//     const code = await provider.getCode(address);
//     console.log(url);

//     //console.log(code);
// }
// getAbi();