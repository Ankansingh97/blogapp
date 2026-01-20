import { useState } from "react";

export default function RegisterPage() {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function register(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.status === 200) {
        alert("✅ Registration successful! Please login now.");
        SetUsername("");
        SetPassword("");
      } else {
        alert("❌ Registration failed. Username might already exist.");
      }
    } catch (error) {
      alert("❌ Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>📋 Register</h1>
      <input
        type="text"
        placeholder="Create a username"
        value={username}
        onChange={(e) => SetUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => SetPassword(e.target.value)}
        required
      />
      <button disabled={isLoading}>
        {isLoading ? "⏳ Registering..." : "✨ Register"}
      </button>
    </form>
  );
}
