export default function Stock({ stock }) {
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
        <b>{stock.price}</b>
      </span>
    </li>
  );
}
