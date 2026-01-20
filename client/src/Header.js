import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        📝 My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">✍️ Create Post</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              🚪 Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">📋 Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
