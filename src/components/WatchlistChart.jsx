import { useAccount } from "../context/AccountContext";
import NoDataFound from "./NoDataFound";

export default function WatchlistChart({ stock, onSetWatchlistToggle }) {
  const { addToWatchlist } = useAccount();
  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleClick() {
    const newWatchlistItem = {
      name: stock.name,
      ticker: stock.symbol,
      price: convertToNum(stock.close),
    };

    addToWatchlist(newWatchlistItem);
    onSetWatchlistToggle((prev) => !prev);
  }

  if (!stock) {
    return;
  }

  return (
    <li key={stock.name} className="watchlist-chart">
      <div>
        <h2>{stock.symbol}</h2>
        <h3>{stock.name}</h3>
      </div>
      <div className="stats">
        <span>${convertToNum(stock.close)}</span>
        <span>
          {convertToNum(stock.change)} ({convertToNum(stock.percent_change)}%)
        </span>
      </div>
      <span className="watchlist-chart-button" onClick={handleClick}>
        +
      </span>
    </li>
  );
}
