import { memo } from "react";
import crossIcon from "../assets/cross.svg";
import refreshIcon from "../assets/refresh.svg";
import increaseIcon from "../assets/arrow-up.svg";
import decreaseIcon from "../assets/arrow-down.svg";

interface CoinProps {
  coin: string;
  rate: number;
  prevRate: number;
  onDelete: (coinToDelete: string) => void;
  onUpdate: (coinToUpdate: string) => void;
}

const Coin = memo(({ coin, rate, prevRate, onDelete, onUpdate }: CoinProps) => {
  const diff = rate - prevRate;

  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>
        <img src={crossIcon} className="me-3" onClick={() => onDelete(coin)} />
        {coin}: ${rate || "Loading..."}
        {diff > 0 && <img src={increaseIcon} />}
        {diff < 0 && <img src={decreaseIcon} />}
      </span>
      <img src={refreshIcon} onClick={() => onUpdate(coin)} />
    </li>
  );
});

export default Coin;
