import { useState } from "react";
import { useAccount } from "../context/AccountContext";

import WatchlistHeading from "./WatchlistHeading";
import WatchlistChart from "./WatchlistChart";
import NoDataFound from "./NoDataFound";

import Form from "./Utils/Form";
// import Input from "./Utils/Input";

export default function Watchlist() {
  const { data, watchlist, deleteFromWatchlist, fetchData } = useAccount();
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

  function handleDelete(stockId) {
    deleteFromWatchlist(stockId);
  }

  if (!watchlist && !watchlistToggle) {
    return (
      <NoDataFound className="watchlist" id="list">
        <WatchlistHeading
          className="watchlist-heading-container no-watchlist"
          toggle={watchlistToggle}
          onToggle={handleWatchlistToggle}
        />
        Add stocks to your watchlist
      </NoDataFound>
    );
  }

  return (
    <ul className="watchlist" id="list">
      <WatchlistHeading
        className="watchlist-heading-container"
        toggle={watchlistToggle}
        onToggle={handleWatchlistToggle}
      />
      {!watchlistToggle ? (
        watchlist?.map((stock) => (
          <li key={stock.id}>
            <div>
              <h2>{stock.ticker}</h2>
              <h3>{stock.name}</h3>
            </div>
            <div>
              <p>${stock.price}</p>
              <span onClick={() => handleDelete(stock.id)}>-</span>
            </div>
          </li>
        ))
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stock/fund name or ticker here..."
              style={{ width: "90%" }}
            />
          </Form>
          <WatchlistChart
            stock={data}
            onSetWatchlistToggle={setWatchlistToggle}
          />
        </>
      )}
    </ul>
  );
}
