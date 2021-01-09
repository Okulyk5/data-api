// deposit KI

const Web3 = require('web3')
const ethers = require('ethers')
const wallet = ethers.Wallet.fromMnemonic(process.env.SK_DEPLOY_WALLET_KEY)
const abi = require('./build/contracts/RewardPool.json')

add = async () => {
	return new Promise( async (resolve, reject) => {
		try {
			let web3 = new Web3("https://ropsten.infura.io/v3/" + process.env.SK_DEPLOY_INFURA_KEY)
			await web3.eth.accounts.wallet.add(wallet)
			let reward = new web3.eth.Contract(abi.abi, '0x659A61d5d72a701b9f88291e963a8c4086E3eFAd')
			let admin = await reward.methods.deposit('0xCfEC6722f119240B97effd5Afe04c8a97caA02EE', 10000).send({from: wallet.address, gas: 420000})
			resolve(admin)
		} catch (e) {
			console.error(e)
			reject(e)
		}
	})
}

add()