import { useState } from "react";

export default function Navbar({ onSetData }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    async function fetchData() {
      const response = await fetch(
        `https://api.twelvedata.com/quote?symbol=${search}&apikey=9360604c3cde4d95bdb2d262c2c2a6cf`
      );
      const data = await response.json();
      onSetData(data);
    }

    fetchData();
    setSearch("");
  }

  return (
    <header className="navbar" id="nav">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stock/fund name or ticker here..."
        />
      </form>
      <nav>
        <span>Notifications</span>
        <span>Alerts</span>
        <span>|</span>
        <span>username/photo</span>
      </nav>
    </header>
  );
}
