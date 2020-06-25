require('dotenv').config();
const { Client } = require('@hashgraph/sdk');

const HederaClient = new Client({
	network: { 'api.testnet.kabuto.sh:50211': '0.0.3' },
	operator: {
		account: process.env.ACCOUNT_ID,
		privateKey: process.env.PRIVATE_KEY,
	},
});

module.exports = HederaClient;
