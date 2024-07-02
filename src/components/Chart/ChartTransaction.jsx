import { useAccount } from "../../context/AccountContext";

export default function ChartTransaction() {
  const {
    isLoading,
    error,
    data,
    amount,
    shares,
    updateFundsAmount,
    updatePortfolio,
    dispatch,
  } = useAccount();

  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleTransaction() {
    updatePortfolio();
    updateFundsAmount(amount.id);
  }

  return (
    <section className="chart transaction" id="chart">
      <div className="totals">
        <h2>Avalaible Funds</h2>
        <span>${amount.amount}</span>
      </div>
      <div>
        <div className="totals">
          <h2>Stock Purchase</h2>
          <span>${convertToNum(data.close * shares)}</span>
        </div>
        <span>
          {data.symbol} at ${convertToNum(data.close)}
        </span>
        <div>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e) =>
              dispatch({ type: "add_shares", payload: e.target.value })
            }
          />
          <label>shares</label>
        </div>
      </div>
      <div className="totals">
        <h2>Remaining Balance</h2>
        <span>${convertToNum(amount.amount - data.close * shares)}</span>
      </div>
      <div>
        <button onClick={handleTransaction}>Complete Transaction</button>
      </div>
    </section>
  );
}
