import { useAccount } from "../context/AccountContext";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Sidebar() {
  const { portfolio } = useAccount();
  const totalInvestment = portfolio?.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="sidebar" id="side">
      <div className="logo">
        <img src={logo} />
        <span>Stock Tracker</span>
      </div>
      <div className="summary-widget">
        <h2>Total Investment</h2>
        <span>
          {!portfolio ? "No data available" : "$" + totalInvestment.toFixed(2)}
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/wallet">Wallet</NavLink>
          </li>
          <li>
            <NavLink to="/news">News</NavLink>
          </li>
          <li>
            <NavLink to="/stocks">Stocks & Funds</NavLink>
          </li>
          <li>
            <NavLink to="/community">Our Community</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
