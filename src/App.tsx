import { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getCoinRate } from "./api/cryptoCompareApi";
import Search from "./components/Search";
import Coin from "./components/Coin";
import { useRates } from "./hooks/useRates";

function App() {
  const [coins, setCoins] = useState(["DOGE"]);
  const { rates, deleteRate, updateRate, updateAllRates } = useRates(coins);
  const intervalId = useRef(0);

  useEffect(() => {
    updateAllRates();
    intervalId.current = setInterval(() => updateAllRates(), 10 * 1000);
    return () => clearInterval(intervalId.current);
  }, [coins, updateAllRates]);

  const handleDelete = useCallback(
    (coinToDelete: string) => {
      setCoins((prev) => prev.filter((coin) => coin !== coinToDelete));
      deleteRate(coinToDelete);
    },
    [deleteRate]
  );

  const handleUpdateAll = () => {
    clearInterval(intervalId.current);
    updateAllRates();
    intervalId.current = setInterval(() => updateAllRates(), 10 * 1000);
  };

  const handleSearch = (input: string) => {
    input = input.trim().toUpperCase();
    getCoinRate(input).then((res) => {
      if (res.data.USD) {
        if (!coins.includes(input)) {
          setCoins((prev) => [...prev, input]);
          toast.success(`Crypto with symbol "${input}" is added to the list`);
        } else
          toast.warning(`Crypto with symbol "${input}" is already in the list`);
      } else toast.error(`No crypto with symbol "${input}"`);
    });
  };

  return (
    <div
      className="bg-dark text-light vh-100 d-flex flex-column pt-4 align-items-center"
      data-bs-theme="dark"
    >
      <Search onSearch={handleSearch} />
      <div className="d-flex w-50 justify-content-between align-items-center">
        <h4 className="mt-4 mb-3">Saved coins: </h4>
        <button className="btn btn-outline-light" onClick={handleUpdateAll}>
          Update all
        </button>
      </div>
      <ul className="list-group w-50">
        {coins.map((coin) => {
          return (
            <Coin
              coin={coin}
              rate={rates[coin]?.rate}
              prevRate={rates[coin]?.prevRate}
              onDelete={handleDelete}
              onUpdate={updateRate}
              key={coin}
            />
          );
        })}
      </ul>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
