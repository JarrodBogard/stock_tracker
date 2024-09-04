import { useState } from "react";
import { useAccount } from "../../context/AccountContext";

export default function Wallet() {
  const [amount, setAmount] = useState(0);
  const {} = useAccount();

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="wallet">
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Add Funds</label>
        <input
          type="number"
          id="amount"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </form>
    </div>
  );
}
