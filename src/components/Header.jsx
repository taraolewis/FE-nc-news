import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>NC News API</h1>
      <nav className="homeButton">
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
