import { useAccount } from "../../context/AccountContext";

import ChartHeading from "./ChartHeading";
import ChartPrices from "./ChartPrices";
import ChartProfile from "./ChartProfile";

export default function ChartDisplay() {
  const { isLoading, error } = useAccount();

  return (
    <section className="chart display" id="chart">
      <ChartHeading />
      <ChartPrices />
      <ChartProfile />
    </section>
  );
}
