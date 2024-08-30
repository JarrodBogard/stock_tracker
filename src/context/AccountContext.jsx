import { createContext, useContext, useEffect, useReducer } from "react";

const AccountContext = createContext();

const API_KEY = import.meta.env.VITE_API_KEY;

function convertToNum(x) {
  return Number.parseFloat(x).toFixed(2);
}

const initialState = {
  isLoading: false,
  error: "",
  data: null,
  portfolio: null,
  watchlist: null,
  profile: null,
  amount: null,
  shares: 0,
  toggle: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case "data/loaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        data: action.payload,
      };

    case "portfolio/loaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        portfolio: action.payload,
      };

    case "portfolio/updated":
      const foundStock = state.portfolio.find(
        (stock) => stock.name === action.payload.name
      );
      return {
        ...state,
        isLoading: false,
        error: "",
        portfolio: foundStock
          ? state.portfolio.map((stock) =>
              stock.name === action.payload.name
                ? {
                    ...stock,
                    shares: action.payload.shares,
                    price: action.payload.price,
                  }
                : stock
            )
          : [...state.portfolio, action.payload],
      };

    case "watchlist/loaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        watchlist: action.payload,
      };

    case "watchlist/add":
      return {
        ...state,
        isLoading: false,
        error: "",
        watchlist: [action.payload, ...state.watchlist],
        // data: null,
      };

    case "watchlist/delete":
      return {
        ...state,
        isLoading: false,
        error: "",
        watchlist: state.watchlist.filter((item) => item.id !== action.payload),
      };

    case "profile/loaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        profile: action.payload,
      };

    case "amount/loaded":
      return {
        ...state,
        isLoading: false,
        error: "",
        amount: action.payload,
        toggle: true,
      };

    case "amount/updated":
      return {
        ...state,
        isLoading: false,
        error: "",
        amount: action.payload,
        shares: 0,
        toggle: false,
      };

    case "add_shares":
      return {
        ...state,
        shares: action.payload,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload,
      };

    default:
      throw new Error(`Unknown action type`);
  }
}

function AccountProvider({ children }) {
  const [
    {
      isLoading,
      error,
      data,
      portfolio,
      watchlist,
      profile,
      amount,
      shares,
      toggle,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchPortfolioData() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`http://localhost:8000/stocks`);
        const responseData = await response.json();

        dispatch({ type: "portfolio/loaded", payload: responseData });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }

    fetchPortfolioData();
  }, []);

  useEffect(function () {
    async function fetchWatchlistData() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`http://localhost:9000/watchlist`);
        const responseData = await response.json();
        dispatch({ type: "watchlist/loaded", payload: responseData });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }

    fetchWatchlistData();
  }, []);

  useEffect(
    function () {
      if (!data) {
        return;
      }
      if (data?.symbol) {
        async function fetchProfileData() {
          dispatch({ type: "loading" });
          try {
            const response = await fetch(
              `https://api.twelvedata.com/profile?symbol=${data.symbol}&apikey=${API_KEY}`
            );
            const responseData = await response.json();
            dispatch({ type: "profile/loaded", payload: responseData });
          } catch (error) {
            dispatch({ type: "rejected", payload: error.message });
          }
        }

        fetchProfileData();
      }
    },

    [data]
  );

  async function fetchData(symbol) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(
        `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
      );

      const responseData = await response.json();

      // Todo: improve error handling using responseData.status
      if (responseData.code === 404) {
        throw new Error(
          "Please enter a valid stock ticker and try search again."
        );
      }
      dispatch({ type: "data/loaded", payload: responseData });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function addToWatchlist(newItem) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:9000/watchlist`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      dispatch({ type: "watchlist/add", payload: responseData });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteFromWatchlist(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:9000/watchlist/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "watchlist/delete", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function fetchFundsData() {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:7000/funds`);
      const responseData = await response.json();
      console.log(responseData, responseData[0]);
      dispatch({ type: "amount/loaded", payload: responseData[0] });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function updateFundsAmount(id) {
    const updatedAccount = {
      ...amount,
      amount: convertToNum(amount.amount - data.close * shares),
    };

    dispatch({ type: "loading" });

    try {
      const response = await fetch(`http://localhost:7000/funds/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedAccount),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      dispatch({ type: "amount/updated", payload: responseData });
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
    }
  }

  async function updatePortfolio() {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`http://localhost:8000/stocks`);
      const responseData = await response.json();
      const foundStock = responseData.find((stock) => stock.name === data.name);

      if (foundStock) {
        const num = (foundStock.price + Number(data.close)) / 2;
        const newPrice = Math.round((num + Number.EPSILON) * 100) / 100;
        // const newPrice = parseFloat(num.toFixed(2));

        const updatedStock = {
          ...foundStock,
          price: newPrice,
          shares: Number(foundStock.shares) + Number(shares),
        };

        const nextResponse = await fetch(
          `http://localhost:8000/stocks/${foundStock.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(updatedStock),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const nextResponseData = await nextResponse.json();
        dispatch({ type: "portfolio/updated", payload: nextResponseData });
      } else {
        const convertedPrice =
          Math.round((Number(data.close) + Number.EPSILON) * 100) / 100;
        const newStock = {
          name: data.name,
          ticker: data.symbol,
          price: convertedPrice,
          shares: Number(shares),
        };

        const nextResponse = await fetch(`http://localhost:8000/stocks`, {
          method: "POST",
          body: JSON.stringify(newStock),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const nextResponseData = await nextResponse.json();
        dispatch({ type: "portfolio/updated", payload: nextResponseData });
      }
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
    }
  }

  return (
    <AccountContext.Provider
      value={{
        isLoading,
        error,
        data,
        portfolio,
        watchlist,
        profile,
        amount,
        shares,
        toggle,
        fetchData,
        addToWatchlist,
        deleteFromWatchlist,
        fetchFundsData,
        updateFundsAmount,
        updatePortfolio,
        dispatch,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

function useAccount() {
  const context = useContext(AccountContext);
  if (context === "undefined") {
    throw new Error("");
  }
  return context;
}

export { AccountProvider, useAccount };
