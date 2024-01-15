import React, { useState } from "react";

function CurrencyConverter() {
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("EUR");
	const [amount, setAmount] = useState(1);
	const [convertedAmount, setConvertedAmount] = useState(0);

	const handleSubmit = async (e) => {
		try {
			const response = await fetch(
				`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
			);
			const data = await response.json();
			const rate = data.rates[toCurrency];
			const converted = rate * amount;
			setConvertedAmount(converted);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				From:
				<select
					value={fromCurrency}
					onChange={(e) => setFromCurrency(e.target.value)}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="GBP">GBP</option>
					<option value="JPY">JPY</option>
				</select>
			</label>
			<br />
			<label>
				To:
				<select
					value={toCurrency}
					onChange={(e) => setToCurrency(e.target.value)}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="GBP">GBP</option>
					<option value="JPY">JPY</option>
				</select>
			</label>
			<br />
			<label>
				Amount:
				<input
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</label>
			<br />
			<button type="submit">Convert</button>
			<br />
			<p>
				{amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
				{toCurrency}
			</p>
		</form>
	);
}

export default CurrencyConverter;
