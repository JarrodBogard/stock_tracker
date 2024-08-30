import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AccountProvider } from "./context/AccountContext";
import { UsersProvider } from "./context/UsersContext";

import Homepage from "./pages/Homepage";
import StockLayout from "./pages/StockLayout";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import ChartDisplay from "./components/Chart/ChartDisplay";
import ChartTransaction from "./components/Chart/ChartTransaction";

export default function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <AccountProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="stocks" element={<StockLayout />}>
              <Route index element={<Navigate replace to="chart" />} />
              <Route path="chart" element={<ChartDisplay />} />
              <Route path="transaction" element={<ChartTransaction />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AccountProvider>
      </UsersProvider>
    </BrowserRouter>
  );
}
