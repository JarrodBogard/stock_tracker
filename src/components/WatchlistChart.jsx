import { useState, useEffect } from "react";
import { useAccount } from "../context/AccountContext";
import NoDataFound from "./NoDataFound";

export default function WatchlistChart({ stock, onSetWatchlistToggle }) {
  const { watchlist, addToWatchlist } = useAccount();
  const [error, setError] = useState("");
  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(
    function () {
      console.log("fired");
      if (error) {
        setTimeout(function () {
          setError("");
        }, 3000);
      }
    },
    [error]
  );

  function handleClick() {
    const newWatchlistItem = {
      name: stock.name,
      ticker: stock.symbol,
      price: convertToNum(stock.close),
    };

    if (
      watchlist
        .map((watchlistItem) => watchlistItem.name)
        .includes(newWatchlistItem.name)
    ) {
      setError("This stock is already in your watchlist.");
      return;
    }

    addToWatchlist(newWatchlistItem);
    onSetWatchlistToggle((prev) => !prev);
  }

  if (!stock) {
    return;
  }

  return (
    <>
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
      {error && (
        <p style={{ textAlign: "center", color: "red", paddingTop: "4px" }}>
          {error}
        </p>
      )}
    </>
  );
}
