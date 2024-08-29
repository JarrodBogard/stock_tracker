import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import StockLayout from "./pages/StockLayout";
import PageNotFound from "./pages/PageNotFound";
import WatchlistAddPage from "./pages/WatchlistAddPage";
import LoginPage from "./pages/LoginPage";
import { AccountProvider } from "./context/AccountContext";
import ChartDisplay from "./components/Chart/ChartDisplay";
import ChartTransaction from "./components/Chart/ChartTransaction";

export default function App() {
  const [authentication, setAuthentication] = useState(false);
  function handleAuthentication(input) {
    setAuthentication(input);
  }
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="stocks" element={<StockLayout />}>
            <Route index element={<Navigate replace to="chart" />} />
            <Route path="chart" element={<ChartDisplay />} />
            <Route path="transaction" element={<ChartTransaction />} />
          </Route>
          <Route
            path="/login"
            element={<LoginPage onAuthentication={handleAuthentication} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}
