const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", ARS: "AR", AUD: "AU",
    AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN",
    BOB: "BO", BRL: "BR", BSD: "BS", BWP: "BW", BYN: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", CHF: "CH",
    CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ", DJF: "DJ", DKK: "DK",
    DOP: "DO", DZD: "DZ", EGP: "EG", ERN: "ER", ETB: "ET", EUR: "EU", FJD: "FJ", FKP: "FK", FOK: "FO",
    GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK",
    HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR",
    ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH", KMF: "KM", KRW: "KR",
    KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", LRD: "LR", LSL: "LS", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRU: "MR", MUR: "MU",
    MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", NGN: "NG", NIO: "NI", NOK: "NO",
    NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG", PHP: "PH", PKR: "PK", PLN: "PL",
    PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC",
    SDG: "SD", SEK: "SE", SGD: "SG", SHP: "SH", SLL: "SL", SOS: "SO", SRD: "SR", SSP: "SS", STN: "ST",
    SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR",
    TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VES: "VE",
    VND: "VN", VUV: "VU", WST: "WS", XAF: "CF", XOF: "SN", XPF: "PF", YER: "YE", ZAR: "ZA", ZMW: "ZM"
};

// Function to fetch exchange rates from the API
async function getExchangeRates() {
    try {
        const response = await fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_vsAtetf35JMxiFk2yyLgv7KW3qoT4vOZgyZ733KB');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('Failed to fetch exchange rates. Please try again later.');
    }
}

// Function to populate the dropdowns
async function populateDropdowns() {
    const exchangeRatesData = await getExchangeRates();
    if (!exchangeRatesData) return;

    const currencyOptions = Object.keys(exchangeRatesData.data);
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = currency;
        option2.value = currency;
        option1.text = currency;
        option2.text = currency;
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
    });

    // Set default values for dropdowns
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'INR';

    // Update flags initially
    updateFlags();
}

// Function to update flags
function updateFlags() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    document.getElementById('fromFlag').src = `https://flagsapi.com/${countryList[fromCurrency]}/flat/64.png`;
    document.getElementById('toFlag').src = `https://flagsapi.com/${countryList[toCurrency]}/flat/64.png`;
}

// Function to get the exchange rate
async function getExchangeRate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;
    const exchangeRatesData = await getExchangeRates();
    if (!exchangeRatesData) return;

    const fromRate = exchangeRatesData.data[fromCurrency].value;
    const toRate = exchangeRatesData.data[toCurrency].value;
    const exchangeRate = (toRate / fromRate).toFixed(4);
    const convertedAmount = (exchangeRate * amount).toFixed(2);

    document.getElementById('exchangeRateMsg').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

// Event listeners
document.getElementById('fromCurrency').addEventListener('change', updateFlags);
document.getElementById('toCurrency').addEventListener('change', updateFlags);
document.getElementById('convertBtn').addEventListener('click', getExchangeRate);

// Populate dropdowns on page load
populateDropdowns();
