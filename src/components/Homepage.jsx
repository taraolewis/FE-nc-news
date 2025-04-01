import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="home-container">
      <div className="box">
        <Link to="/topics" className="container">
          <h2>Topics</h2>
        </Link>
        <p>View different Topics</p>
      </div>

      <div className="box">
        <Link to="/articles" className="container">
          <h2>Articles</h2>
        </Link>
        <p>View all Articles</p>
      </div>

      <div className="box">
        <Link to="/users" className="container">
          <h2>Users</h2>
        </Link>
        <p>View Users</p>
      </div>
    </div>
  );
}

export default Homepage;
