import { useAccount } from "../../context/AccountContext";

export default function ChartPrices() {
  const { isLoading, error, data } = useAccount();

  function convertToNum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  return (
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
          <b>52-wk low</b> <span>{convertToNum(data.fifty_two_week.low)}</span>
        </li>
      </ul>
    </div>
  );
}
