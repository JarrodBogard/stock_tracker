import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Chart from "../components/Chart";
import Watchlist from "../components/Watchlist";

export default function StockLayout() {
  const [data, setData] = useState(null);
  const [watchlist, setWatchlist] = useState(null);

  return (
    <main className="layout">
      <Sidebar />
      <Navbar onSetData={setData} />
      <Portfolio />
      <Chart data={data} onSetWatchlist={setWatchlist} />
      <Watchlist watchlist={watchlist} onSetWatchlist={setWatchlist} />
    </main>
  );
}
