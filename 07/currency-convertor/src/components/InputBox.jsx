import React, {useId} from 'react';

const InputBox = ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = 'USD',
    amountDisabled = false,
    currencyDisabled = false,
    className = ''
}) => {
    const id = useId();
  return (
    <div>
        <div className={` bg-white p-3 rounded-lg text-sm flex shadow-inner ${className}`}>
           <div className='w-1/2 '>
                <label htmlFor={id} className='text-black/40 mb-2 inline-block font-medium'>{label}</label>
                <input type="number"
                id={id}
                    className='outline-none w-full bg-transparent py-1.5 text-lg'
                    placeholder='Amount'
                    disabled={amountDisabled}
                    // The value prop uses the current state (number or empty string)
                    value={amount}
                    // FIX: Pass the raw string value (which can be "") to allow the user to clear the input.
                    // App.jsx will handle converting "" to 0 for calculation.
                    onChange={(e)=>onAmountChange && onAmountChange(e.target.value)} 
                />
            </div>
            <div className='w-1/2 flex flex-wrap justify-end text-right'>
                <p className='text-black/40 mb-2 w-full'>Currency Type</p>
                <select className=' outline-none w-full bg-transparent border border-black/20 rounded-md p-2 cursor-pointer transition-colors hover:bg-gray-50'
                    value={selectedCurrency}
                    onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {/* Ensure that the options are unique and keyed */}
                    {currencyOptions.map((currency)=>(
                        <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </div>
    </div>
  );
}

export default InputBox;
