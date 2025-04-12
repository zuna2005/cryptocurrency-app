import { useCallback, useEffect, useState } from "react";
import { getCoinRate } from "../api/cryptoCompareApi";

interface ratesType {
  [key: string]: {
    rate: number;
    prevRate: number;
  };
}

export function useRates(coins: Array<string>) {
  const [rates, setRates] = useState<ratesType>({});

  const deleteRate = useCallback((coinToDelete: string) => {
    setRates((prev) => {
      const newRates = { ...prev };
      delete newRates[coinToDelete];
      return newRates;
    });
  }, []);

  const updateRate = useCallback((coin: string) => {
    getCoinRate(coin).then((res) => {
      setRates((prev) => ({
        ...prev,
        [coin]: { rate: res.data.USD, prevRate: prev[coin]?.rate || res.data.USD },
      }));
    });
  }, []);

  const updateAllRates = useCallback(() => {
    coins.forEach((coin) => updateRate(coin));
  }, [coins, updateRate]);

  useEffect(() => updateAllRates(), [updateAllRates]);

  return {
    rates,
    deleteRate,
    updateRate,
    updateAllRates,
  };
}
