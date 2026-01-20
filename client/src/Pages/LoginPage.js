import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [redirect, SetRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          SetRedirect(true);
        });
      } else {
        alert("❌ Wrong credentials. Please try again.");
      }
    } catch (error) {
      alert("❌ Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>🔐 Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => SetUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => SetPassword(e.target.value)}
        required
      />
      <button disabled={isLoading}>
        {isLoading ? "⏳ Logging in..." : "🚀 Login"}
      </button>
    </form>
  );
}
