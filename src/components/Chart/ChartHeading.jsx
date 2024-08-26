import { useNavigate } from "react-router-dom";
import { useAccount } from "../../context/AccountContext";

export default function ChartHeading() {
  const { isLoading, error, data, addToWatchlist, fetchFundsData } =
    useAccount();

  const navigate = useNavigate();

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
    navigate("transaction");
  }

  return (
    <>
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
    </>
  );
}
