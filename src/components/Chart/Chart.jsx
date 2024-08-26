import { useAccount } from "../../context/AccountContext";

import ChartDisplay from "./ChartDisplay";
import ChartTransaction from "./ChartTransaction";
import NoDataFound from "../NoDataFound";

export default function Chart() {
  const { isLoading, error, data, toggle } = useAccount();

  if (error) {
    return (
      <NoDataFound className="chart" id="chart">
        {error}
      </NoDataFound>
    );
  }

  if (!data)
    return (
      <NoDataFound className="chart" id="chart">
        Pick a stock to view data
      </NoDataFound>
    );

  // if (toggle) {
  //   return <ChartTransaction />;
  // }

  return <ChartDisplay />;
}
