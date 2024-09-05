import { useState } from "react";
import { useAccount } from "../../context/AccountContext";

export default function Wallet() {
  const [deposit, setDeposit] = useState(0);

  const { amount, updateFundsAmount } = useAccount();

  function handleSubmit(e) {
    e.preventDefault();

    if (!deposit) return;

    updateFundsAmount(amount.id, deposit);
    setDeposit(0);
  }

  // if (!amount) return <p>Loading...</p>;

  return (
    <div className="wallet">
      <h2>{amount.amount}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Add Funds</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
