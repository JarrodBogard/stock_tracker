import { useState } from "react";
import { useAccount } from "../../context/AccountContext";

import Stock from "../Stock";

export default function PortfolioPagination({ items }) {
  const { portfolio } = useAccount();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  function handleNext() {
    setStartIndex((currentIndex) =>
      currentIndex + itemsPerPage < portfolio.length
        ? currentIndex + 1
        : currentIndex
    );
  }

  function handlePrevious() {
    setStartIndex((currentIndex) =>
      currentIndex > 0 ? currentIndex - 1 : currentIndex
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {startIndex > 0 && (
        <button className="button-left" onClick={handlePrevious}>
          &lt;
        </button>
      )}
      <ul>
        {portfolio
          ?.slice(startIndex, startIndex + itemsPerPage)
          .map((item, index) => (
            <Stock key={item.id} stock={item} />
          ))}
      </ul>
      {startIndex + itemsPerPage < portfolio.length && (
        <button className="button-right" onClick={handleNext}>
          &gt;
        </button>
      )}
    </div>
  );
}
