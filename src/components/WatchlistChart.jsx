import { useNavigate } from "react-router-dom";
import NoDataFound from "./NoDataFound";

export default function WatchlistChart({
  stock,
  onSetWatchlistToggle,
  onSetWatchlist,
}) {
  const navigate = useNavigate();
  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleClick() {
    const newWatchlistItem = {
      id: stock.name,
      name: stock.name,
      ticker: stock.symbol,
      price: convertToNum(stock.close),
    };

    console.log(newWatchlistItem);

    async function addToWatchlist() {
      const response = await fetch(`http://localhost:9000/watchlist`, {
        method: "POST",
        body: JSON.stringify(newWatchlistItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      onSetWatchlist((prevWatchlist) => [...prevWatchlist, responseData]);
    }

    addToWatchlist();
    onSetWatchlistToggle((prev) => !prev);
  }

  if (!stock) {
    return (
      <NoDataFound>Search stock tickers to add to your watchlist.</NoDataFound>
    );
  }

  return (
    <li
      key={stock.name}
      className="watchlist-chart"
      style={{ position: "relative" }}
    >
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
      <span
        style={{
          position: "absolute",
          right: "7.5px",
          top: "7.5px",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        +
      </span>
    </li>
  );
}
