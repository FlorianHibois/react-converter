import React, { useState, useEffect } from "react";
import useAxios from 'axios-hooks'


const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=QpPOn8JNh1x3asFW0ISgB38xXObt0TJlNsDcQHCQ";
const paramsURL = "&currencies=&base_currency="

export default function CurrenciesAPI() {
	const [{ data, loading, error }] = useAxios(URL);
	//
	const [currencyFrom, setCurrencyFrom] = useState("USD");
	const [currencyTo, setCurrencyTo] = useState("EUR");
	const [amount, setAmount] = useState(1);
	const [convertedAmount, setConvertedAmount] = useState(0);
	
	if (loading) return <p>En cours de chargement...</p>;
	if (error) return <p>Erreur !</p>;
	
	let currenciesList = Object.keys(data.data);
	

	useEffect(() => {
		handleUpdate()
	},[currencyFrom, currencyTo, amount, convertedAmount]);

	currenciesList = currenciesList.map((item, index) => {
		return (
			<option value={item} key={index}>{item}</option>
			)
		}
	);
		
	async function handleUpdate() {
		try {
			const response = await fetch(
				URL + paramsURL + currencyFrom
			);
			const data = await response.json();
			const rate = data.data[currencyTo];
			const converted = rate * amount;
			setConvertedAmount(converted);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
            <form onChange={handleUpdate}>
				<label htmlFor="amount">
					Amount:
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</label>
                <label htmlFor="from">
					From
					<select
						value={currencyFrom}
						onChange={(e) => setCurrencyFrom(e.target.value)}
					>
						{currenciesList}
					</select>
				</label>
                <label htmlFor="to">
					to
					<select
						value={currencyTo}
						onChange={(e) => setCurrencyTo(e.target.value)}
					>
						{currenciesList}
					</select>
				</label>
				
				<div>
					<label htmlFor="result">
						Result: 
						<p>
							{amount} {currencyFrom} = {convertedAmount.toFixed(2)}{" "}
							{currencyTo}
						</p>
					</label>
				</div>
            </form>
		</div>
	);
}
