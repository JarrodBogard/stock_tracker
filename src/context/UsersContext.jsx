import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const UsersContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case "login":
      return {
        ...state,
        isLoading: false,
        error: "",
        isAuthenticated: true,
        user: action.payload,
      };

    case "logout":
      return {
        ...state,
        isLoading: false,
        error: "",
        isAuthenticated: false,
        user: null,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const [{ isLoading, error, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const navigate = useNavigate();

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`http://localhost:4000/users`);
      const responseData = await response.json();

      const verifiedUser = responseData.find(
        (user) => user.email === email && user.password === password
      );

      if (verifiedUser) {
        dispatch({ type: "login", payload: verifiedUser });
        navigate("/stocks");
      } else {
        throw new Error("Unable to verify login info. Try again.");
      }
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  function logout() {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "logout" });
      navigate("/");
    } catch (error) {
      dispatch({ type: "rejected", payload: error.payload });
    }
  }

  return (
    <UsersContext.Provider value={{ isLoading, error, user, login, logout }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error(
      "UsersContext access is restricted to child components of the UsersContext Provider"
    );
  }
  return context;
}

export { UsersProvider, useUsers };
