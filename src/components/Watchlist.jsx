import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WatchlistChart from "./WatchlistChart";

export default function Watchlist({ watchlist, onSetWatchlist }) {
  const [watchlistToggle, setWatchlistToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`http://localhost:9000/watchlist`);
      const responseData = await response.json();
      onSetWatchlist(responseData);
    }

    fetchData();
  }, []);

  function handleWatchlistToggle() {
    setWatchlistToggle((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("search");
    async function fetchData() {
      const response = await fetch(
        `https://api.twelvedata.com/quote?symbol=${search}&apikey=9360604c3cde4d95bdb2d262c2c2a6cf`
      );
      const responseData = await response.json();

      setData(responseData);
    }

    fetchData();
    setSearch("");
  }

  if (!watchlist) {
    return <p>Add stocks to your watchlist.</p>;
  }

  return (
    <ul className="watchlist" id="list">
      <span className="watchlist-heading-container">
        <h1>My Watchlist</h1>
        <span onClick={handleWatchlistToggle}>
          {!watchlistToggle ? "+" : "-"}
        </span>
        {/* <Link to="/watchlist-add">+</Link> */}
      </span>
      {!watchlistToggle ? (
        watchlist.map((stock) => (
          <li key={stock.id}>
            <div>
              <h2>{stock.ticker}</h2>
              <h3>{stock.name}</h3>
            </div>
            <div>
              <p>${stock.price}</p>
            </div>
          </li>
        ))
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stock/fund name or ticker here..."
            />
          </form>
          <WatchlistChart
            stock={data}
            onSetWatchlistToggle={setWatchlistToggle}
            onSetWatchlist={onSetWatchlist}
          />
        </>
      )}
    </ul>
  );
}
