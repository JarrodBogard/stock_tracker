import { useEffect, useState } from "react";
import NoDataFound from "./NoDataFound";

export default function Chart({ data, onSetWatchlist }) {
  const [profile, setProfile] = useState(null);
  const [amount, setAmount] = useState(null);
  const [shares, setShares] = useState(0);
  const [chartToggle, setChartToggle] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(
    function () {
      if (data?.symbol) {
        async function fetchData() {
          const response = await fetch(
            `https://api.twelvedata.com/profile?symbol=${data.symbol}&apikey=${API_KEY}`
          );
          const responseData = await response.json();
          setProfile(responseData);
        }

        fetchData();
      }
    },
    [data]
  );

  function handleClick() {
    const newWatchlistItem = {
      // id: data.name,
      name: data.name,
      ticker: data.symbol,
      price: convertToNum(data.close),
    };

    async function addToWatchlist() {
      const response = await fetch(`http://localhost:9000/watchlist`, {
        method: "POST",
        body: JSON.stringify(newWatchlistItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      onSetWatchlist((prevWatchlist) => [...prevWatchlist, data]);
    }

    addToWatchlist();
  }

  function handleToggle() {
    async function fetchData() {
      const response = await fetch(`http://localhost:7000/funds`);
      const responseData = await response.json();
      setAmount(responseData[0]);
      setChartToggle((prevToggle) => !prevToggle);
    }

    fetchData();
  }

  function handleTransaction() {
    const updatedAccount = {
      ...amount,
      amount: convertToNum(amount.amount - data.close * shares),
    };

    async function updateFundsAmount() {
      const response = await fetch(`http://localhost:7000/funds/${amount.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedAccount),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setAmount(responseData);
      setShares(0);
      setChartToggle((prevToggle) => !prevToggle);
    }

    async function updatePortfolio() {
      const response = await fetch(`http://localhost:8000/stocks`);
      const responseData = await response.json();
      const foundStock = responseData.find((stock) => stock.name === data.name);

      if (foundStock) {
        const num = (foundStock.price + Number(data.close)) / 2;
        const newPrice = Math.round((num + Number.EPSILON) * 100) / 100;
        // const newPrice = parseFloat(num.toFixed(2));

        const updatedStock = {
          ...foundStock,
          price: newPrice,
          shares: Number(foundStock.shares) + Number(shares),
        };

        const nextResponse = await fetch(
          `http://localhost:8000/stocks/${foundStock.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(updatedStock),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const nextResponseData = await nextResponse.json();
        console.log(nextResponseData);
      } else {
        const convertedPrice =
          Math.round((Number(data.close) + Number.EPSILON) * 100) / 100;
        const newStock = {
          name: data.name,
          ticker: data.symbol,
          price: convertedPrice,
          shares: Number(shares),
        };

        console.log(newStock);

        const nextResponse = await fetch(`http://localhost:8000/stocks`, {
          method: "POST",
          body: JSON.stringify(newStock),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const nextResponseData = await nextResponse.json();
        console.log(nextResponseData);
      }
    }

    updatePortfolio();
    updateFundsAmount();
  }

  if (!data)
    return (
      <NoDataFound className={"chart"} id={"chart"}>
        Pick a stock to view data
      </NoDataFound>
    );

  if (chartToggle) {
    return (
      <section className="chart transaction">
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
              onChange={(e) => setShares(e.target.value)}
            />
            <label>shares</label>
          </div>
        </div>
        <div className="totals">
          <h2>Remaining Balance</h2>
          <span>${convertToNum(amount.amount - data.close * shares)}</span>
        </div>
        <button onClick={handleTransaction}>Complete Transaction</button>
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
