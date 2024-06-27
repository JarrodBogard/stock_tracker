import { useEffect, useState } from "react";

import Stock from "./Stock";

export default function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`http://localhost:8000/stocks`);
      const responseData = await response.json();
      setData(responseData);
    }

    fetchData();
  }, []);

  if (!data) {
    return <p>There are currently no stocks in your portfolio.</p>;
  }

  return (
    <div className="portfolio" id="folio">
      <h1>My Portfolio</h1>
      <ul>
        {data.map((stock) => (
          <Stock key={stock.id} stock={stock} />
        ))}
      </ul>
    </div>
  );
}
