export default function Stock({ stock }) {
  const totalValue = stock.shares * stock.price;
  return (
    <li className="stock">
      <h2>
        {stock.name.length > 12
          ? stock.name.substring(0, 12).concat("...")
          : stock.name}
      </h2>
      <span>
        Total Shares
        <b>{stock.shares}</b>
      </span>
      <span>
        Total Return
        <b>${totalValue.toFixed(2)}</b>
      </span>
    </li>
  );
}
