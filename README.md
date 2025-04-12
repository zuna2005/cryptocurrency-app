## Crypto Rate Tracker

A React + TypeScript app to track real-time cryptocurrency exchange rates using the [CryptoCompare API](https://min-api.cryptocompare.com/documentation).

### API
Rates are fetched from:
```
https://min-api.cryptocompare.com/data/price?fsym=<NAME>&tsyms=USD&api_key=<API_KEY>
```
- Replace `<NAME>` with the cryptocurrency symbol (e.g., BTC, ETH, DOGE).
- Replace `<API_KEY>` with your API key.

### Features

- Starts with **DOGE** in the list
- **Search** for a coin symbol to add it (if it exists and isn't already in the list)
- Auto-updates **every 10 seconds**
- Shows rate changes with **up/down arrows**
- Each coin has:
  - **Delete** button
  - **Update** button (fetches latest rate instantly)
- **Update All** button refreshes all rates and resets the timer
- Uses a custom hook: `useRates` to manage API calls and state

### Tech Stack

- React + TypeScript
- Bootstrap (dark theme)
- React Toastify
- CryptoCompare API
