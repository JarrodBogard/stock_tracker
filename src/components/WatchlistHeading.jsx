export default function WatchlistHeading({ className, toggle, onToggle }) {
  return (
    <span className={className}>
      <span>My Watchlist</span>
      <span onClick={onToggle}>{!toggle ? "+" : "-"}</span>
    </span>
  );
}
