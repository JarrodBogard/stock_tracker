import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../context/AccountContext";

import Nav from "./Nav";
import Form from "../Utils/Form";
import Input from "../Utils/Input";

export default function Navbar() {
  const navigate = useNavigate();
  const { fetchData } = useAccount();
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetchData(search);
    setSearch("");
    navigate("/stocks/chart");
  }

  return (
    <header className="navbar" id="nav">
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search stock/fund name or ticker here..."
        />
      </Form>
      <Nav />
    </header>
  );
}
