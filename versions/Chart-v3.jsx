import { useEffect } from "react";
import { useAccount } from "../context/AccountContext";
import NoDataFound from "./NoDataFound";

export default function Chart() {
  const {
    isLoading,
    error,
    data,
    profile,
    amount,
    shares,
    toggle,
    addToWatchlist,
    fetchFundsData,
    updateFundsAmount,
    updatePortfolio,
    dispatch,
  } = useAccount();

  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  function handleClick() {
    const newWatchlistItem = {
      name: data.name,
      ticker: data.symbol,
      price: convertToNum(data.close),
    };

    addToWatchlist(newWatchlistItem);
  }

  function handleToggle() {
    fetchFundsData();
  }

  function handleTransaction() {
    updatePortfolio();
    updateFundsAmount(amount.id);
  }

  if (!data && error) {
    return (
      <NoDataFound className={"chart"} id={"chart"}>
        {error}
      </NoDataFound>
    );
  }

  if (!data)
    return (
      <NoDataFound className={"chart"} id={"chart"}>
        Pick a stock to view data
      </NoDataFound>
    );

  if (toggle) {
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

  return (
    <section className="chart" id="chart">
      <span className="chart-heading-container">
        <h1>{data.name}</h1>
        <div>
          <span onClick={handleClick}>Add to watchlist</span>|
          <span onClick={handleToggle}>Add to portfolio</span>
        </div>
      </span>
      <h2>
        {convertToNum(data.close)} {data.currency}
      </h2>
      <h3>
        {(data.close - data.previous_close).toFixed(2)} (
        {Number(data.percent_change).toFixed(2)}%)
      </h3>
      <div className="prices">
        <ul>
          <li>
            <b>Open</b> <span>{convertToNum(data.open)}</span>
          </li>
          <li>
            <b>High</b> <span>{convertToNum(data.high)}</span>
          </li>
          <li>
            <b>Low</b> <span>{convertToNum(data.low)}</span>
          </li>
        </ul>
        <ul>
          <li>
            <b>52-wk range</b>{" "}
            <span>
              {convertToNum(data.fifty_two_week.range.split("-")[0]) +
                " - " +
                convertToNum(data.fifty_two_week.range.split("-")[1])}
            </span>
          </li>
          <li>
            <b>52-wk high</b>{" "}
            <span>{convertToNum(data.fifty_two_week.high)}</span>
          </li>
          <li>
            <b>52-wk low</b>{" "}
            <span>{convertToNum(data.fifty_two_week.low)}</span>
          </li>
        </ul>
      </div>
      {profile ? (
        <article>
          <h3>About</h3>
          <p>{profile.description}</p>
          <div className="details">
            <span>
              <b>CEO:</b> {profile.CEO}
            </span>
            <span>
              <b>Headquarters: </b>
              {profile.address},{profile.city} {profile.state} {profile.zip},{" "}
              {profile.country}
            </span>
            <span>
              <b>Number of employees: </b>
              {profile.employees}
            </span>
          </div>
        </article>
      ) : (
        <p>
          Unfortunaltely, no company data is available at this time. Check back
          later.
        </p>
      )}
    </section>
  );
}
