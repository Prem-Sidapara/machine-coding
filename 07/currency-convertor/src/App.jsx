import {React, useState, useCallback, useEffect } from 'react';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import {InputBox} from './components/index.js';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const App=()=> {
  const [amount, setAmount] = useState(1); // start with 1 instead of 0
  const [from, setFrom] = useState('usd'); // lowercase for API
  const [to, setTo] = useState('inr');     // lowercase for API
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = useCallback(() => {
    const rate = currencyInfo[to.toLowerCase()] || 0; // normalize key lookup
    const calculatedAmount = amount * rate;

    if (isFinite(calculatedAmount)) {
        setConvertedAmount(calculatedAmount.toFixed(2));
    } else {
        setConvertedAmount(0);
    }
  }, [amount, from, to, currencyInfo]);
  
  useEffect(() => {
      convert();
  }, [amount, from, to, currencyInfo, convert]);


  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  return (
  <>
    <div
      className='w-full h-screen bg-cover bg-center flex justify-center items-center font-[Inter]'
      style={{backgroundImage: `url('https://images.pexels.com/photos/13057867/pexels-photo-13057867.jpeg')`}}
    > 
    
      <div className='w-full '>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-xl p-6 backdrop-blur-sm bg-white/30 shadow-2xl'>
          <h1 className="text-center text-white-300 text-3xl font-bold mb-6 tracking-wider">Currency Converter</h1>
          <form 
          className='flex flex-col gap-4'
            onSubmit={(e)=>{
            e.preventDefault();
            convert();
          }}>
            <div className='w-full '>
              <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setFrom(currency.toLowerCase())}
              onAmountChange={(amount)=>setAmount(amount)}
              selectedCurrency={from}
              />
            </div>

            <div  className='relative w-full '>
              <button 
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/50 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 py-1 font-semibold shadow-md'
              onClick={swap}
              type="button"
              >
                <SwapVertIcon />
              </button>
            </div>

            <div className='w-full mb-1'>
              <InputBox
              label="To"
              currencyOptions={options}
              amount={convertedAmount}
              onCurrencyChange={(currency)=>setTo(currency.toLowerCase())}
              selectedCurrency={to}
              amountDisabled
              />
            </div >

          </form>
        </div>
      </div>

    </div>
  </>
  );
}

export default App;