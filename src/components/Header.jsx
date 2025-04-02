import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [user] = useState({
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });
  return (
    <header className="header">
      <h1>NC News API</h1>
      <nav className="navContainer">
        <Link to="/" className="homeButton">
          Home
        </Link>

        <Link to="/profile" className="userAvatar">
          <img src={user.avatar_url} alt={user.name} className="avatarImage" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
