import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import StockLayout from "./pages/StockLayout";
import PageNotFound from "./pages/PageNotFound";
import WatchlistAddPage from "./pages/WatchlistAddPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [authentication, setAuthentication] = useState(false);
  function handleAuthentication(input) {
    setAuthentication(input);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="stocks" element={<StockLayout />} />
        <Route path="watchlist-add" element={<WatchlistAddPage />} />
        <Route
          path="/login"
          element={<LoginPage onAuthentication={handleAuthentication} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
