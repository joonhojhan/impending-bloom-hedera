import './tailwind.generated.css';
import './App.css';
import React from 'react';
import Transaction from './components/Transaction';

function App() {
	return (
		<div className="text-center bg-gray-900 h-screen w-screen">
			<Transaction />
		</div>
	);
}

export default App;
