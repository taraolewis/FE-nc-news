import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>NC News API</h1>
      <nav className="navContainer">
        <Link to="/" className="homeButton">
          Home
        </Link>

        <Link to="/profile" className="userAvatar">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt="User Avatar"
            className="avatarImage"
          />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
