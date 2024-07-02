import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Chart from "../components/Chart/Chart";

export default function WatchlistAddPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

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

  return (
    <div className="watchlist-add">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stock/fund name or ticker here..."
        />
      </form>
      <Chart data={data} />
    </div>
  );
}
