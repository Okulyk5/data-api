const axios = require('axios');

// transactions
exports.getWalletTxList = async (params, query) => {
    const { data, status } = await axios.get(
      'https://api.etherscan.io/api',
      {
        params: {
        	module: 'account',
			action: 'txlist',
			address: query.address, //0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
			startblock: 0,
			endblock: 99999999,
			sort: 'asc',
			apikey: '3215JX1H7F1JV7DCEABBF18MEUGGUK57AE'
        },
      }
    )

    if (status !== 200) {
      return null
    }

    return data
}



// token transfers
exports.getWalletTokenTx = async (params, query) => {

    const { data, status } = await axios.get(
      'https://api.etherscan.io/api',
      {
        params: {
        	module: 'account',
			action: 'tokentx',
			address: query.address, //0x4e83362442b8d1bec281594cea3050c8eb01311c
			startblock: 0,
			endblock: 99999999,
			sort: 'asc',
			apikey: '3215JX1H7F1JV7DCEABBF18MEUGGUK57AE'
        },
      }
    )
    
    if (status !== 200) {
      return null
    }

    return data
}