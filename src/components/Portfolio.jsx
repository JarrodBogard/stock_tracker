import { useAccount } from "../context/AccountContext";
import NoDataFound from "./NoDataFound";

import Stock from "./Stock";

export default function Portfolio() {
  const { portfolio } = useAccount();

  if (!portfolio) {
    return (
      <NoDataFound className="portfolio-box" id="folio">
        There are currently no stocks in your portfolio.
      </NoDataFound>
    );
  }

  return (
    <div className="portfolio" id="folio">
      <h1>My Portfolio</h1>
      <ul>
        {portfolio?.map((stock) => (
          <Stock key={stock.id} stock={stock} />
        ))}
      </ul>
    </div>
  );
}
