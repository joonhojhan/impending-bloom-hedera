import React, { useState, useEffect } from 'react';
import { AccountBalanceQuery, CryptoTransferTransaction } from '@hashgraph/sdk';
import { HederaClient, TestnetClient } from '../server/hedera-client';

const Transaction = () => {
	const [sender, setSender] = useState(HederaClient._operatorAccount);
	const [receiver, setReceiver] = useState('');
	const [transactionAmount, setTransactionAmount] = useState('');
	const [accountBalance, setAccountBalance] = useState(0);

	useEffect(() => {
		getBalance();
	}, []);

	const getBalance = async () => {
		const balance = await new AccountBalanceQuery()
			.setAccountId('0.0.74658')
			.execute(TestnetClient);

		console.log(`${HederaClient._operatorAccount} balance = ${balance.value()}`);
		setAccountBalance(balance.value().toString());
	};

	const sendHbar = async (sender, receiver, amount) => {
		new CryptoTransferTransaction()
			.addSender(sender, amount)
			.addRecipient(receiver, amount)
			.build(HederaClient)
			.execute(HederaClient);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('sender :::', sender);
		console.log('receiver :::', receiver);
		console.log('transactionAmount :::', transactionAmount);
		sendHbar(sender, receiver, transactionAmount);
		getBalance();
	};

	return (
		<div className="flex justify-center h-screen">
			<form className="w-full max-w-sm self-center" onSubmit={handleSubmit}>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="sender"
						>
							Account Balance
						</label>
					</div>
					<div className="md:w-2/3">
						<p className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
							{accountBalance}
						</p>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="sender"
						>
							Sender
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							type="text"
							value={sender}
							onChange={(e) => setSender(e.target.value)}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="receiver"
						>
							Receiver
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							type="text"
							value={receiver}
							onChange={(e) => setReceiver(e.target.value)}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label
							className="block text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
							htmlFor="transactionAmount"
						>
							Amount
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							type="number"
							value={transactionAmount}
							onChange={(e) => setTransactionAmount(e.target.value)}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-1/3"></div>
					<div className="md:w-2/3">
						<button
							className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="Submit"
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Transaction;
