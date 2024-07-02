import { useState } from "react";
import { useAccount } from "../context/AccountContext";

import WatchlistChart from "./WatchlistChart";
import NoDataFound from "./NoDataFound";

export default function Watchlist() {
  const { data, watchlist, fetchData } = useAccount();
  const [watchlistToggle, setWatchlistToggle] = useState(false);
  const [search, setSearch] = useState("");

  function handleWatchlistToggle() {
    setWatchlistToggle((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetchData(search);
    setSearch("");
  }

  if (watchlist && !watchlistToggle) {
    return (
      <NoDataFound
        className="watchlist"
        id="list"
        style={{ position: "relative" }}
      >
        <span
          className="watchlist-heading-container"
          style={{
            position: "absolute",
            right: "15px",
            top: "15.5px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            paddingLeft: "1.95rem",
          }}
        >
          <span>My Watchlist</span>
          <span onClick={handleWatchlistToggle}>
            {!watchlistToggle ? "+" : "-"}
          </span>
        </span>
        Add stocks to your watchlist
      </NoDataFound>
    );
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
        watchlist?.map((stock) => (
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
              style={{ width: "90%" }}
            />
          </form>
          <WatchlistChart
            stock={data}
            onSetWatchlistToggle={setWatchlistToggle}
          />
        </>
      )}
    </ul>
  );
}
