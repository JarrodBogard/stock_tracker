import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Chart from "../components/Chart";
import Watchlist from "../components/Watchlist";

export default function StockLayout() {
  return (
    <main className="layout">
      <Sidebar />
      <Navbar />
      <Portfolio />
      <Chart />
      <Watchlist />
    </main>
  );
}
