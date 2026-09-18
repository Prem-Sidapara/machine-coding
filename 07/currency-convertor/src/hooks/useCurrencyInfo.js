import { useEffect , useState} from "react";

const useCurrencyInfo = (currency) => {
    // State to hold the currency rates (e.g., {'inr': 83.21, 'eur': 0.92, ...})
    const [data, setData] = useState({});
    
    // Safely convert input currency to lowercase for the API URL
    const urlCurrency = currency ? currency.toString().toLowerCase() : ''; 
    
    useEffect(() => {
        // Only fetch if a valid currency code is available
        if (!urlCurrency) return; 
        
        // Use the dynamic API link structure based on the 'from' currency
        const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${urlCurrency}.json`;

        fetch(apiUrl) 
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status} for currency: ${urlCurrency}`);
                    throw new Error(`Failed to fetch data for ${urlCurrency}`);
                }
                return response.json();
            })
            .then(response => {
                // FIX: Extract the rates object, which is keyed by the base currency (e.g., response['usd'])
                setData(response[urlCurrency] || {}); 
            })
            .catch((error) => {
                console.error("Could not fetch currency data:", error);
                // On failure, set an empty object to prevent bad data from populating options
                setData({}); 
            });
            
            
    }, [urlCurrency]); 
    
    // The hook returns the rates object
    return data;
}

export default useCurrencyInfo;
