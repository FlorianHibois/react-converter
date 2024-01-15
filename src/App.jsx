import { useState } from 'react'
import CurrenciesAPI from '../components/CurrenciesAPI'
import './App.css'
import CurrencyConverter from '../components/CurrencyConverter'



export default function App() {
   
  
  return (
    <div className="App">
      <CurrenciesAPI />
      <CurrencyConverter/>
    </div>
  )
}
