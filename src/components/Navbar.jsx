import { useState } from "react";
import { useAccount } from "../context/AccountContext";

export default function Navbar() {
  const { fetchData } = useAccount();
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetchData(search);
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
