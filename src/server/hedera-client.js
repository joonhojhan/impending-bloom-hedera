require('dotenv').config();
const { Client } = require('@hashgraph/sdk');

const ACCOUNT_ID = '0.0.74658';
const PUBLIC_KEY =
	'302a300506032b6570032100bdbd9356c4332faa9fca131071f21ff2474f3b6578dca55ee16f03df022bb006';
const PRIVATE_KEY =
	'302e020100300506032b657004220420566bc7a54fb9523a3a2de284e66629a62c0fc107926a47cc509f8c84380cef66';

const HederaClient = new Client({
	network: {
		'anywhere.herokuapp.com/https://api.testnet.kabuto.sh/v1': '0.0.3',
	},
	operator: {
		account: process.env.ACCOUNT_ID || ACCOUNT_ID,
		privateKey: process.env.PRIVATE_KEY || PRIVATE_KEY,
	},
});

const TestnetClient = Client.forTestnet().setOperator(
	process.env.ACCOUNT_ID || ACCOUNT_ID,
	process.env.PRIVATE_KEY || PRIVATE_KEY
);

export { HederaClient, TestnetClient };
