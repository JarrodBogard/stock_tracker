import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onAuthentication }) {
  const [email, setEmail] = useState("test@testmail.com");
  const [password, setPassword] = useState("testpassword");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      login();
    }
  }

  function login() {
    async function fetchData() {
      const response = await fetch(`http://localhost:4000/users`);
      const responseData = await response.json();

      const user = responseData[0];
      if (user.email === email && user.password === password) {
        onAuthentication(true);
        navigate("/stocks");
      } else {
        console.log("email or password are incorrect. try again");
      }
    }

    fetchData();
  }

  function logout() {
    onAuthentication(false);
    navigate("/");
  }

  console.log(email, password);

  return (
    <main className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
