import { NavLink } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="homepage">
      <NavLink to="/login">Start Investing Today</NavLink>
    </div>
  );
}
