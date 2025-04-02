import React, { useState, useEffect } from "react";
import { fetchUsers } from "../utils";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="usersContainer">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username} className="userCard">
            <p>
              <span className="userName">{user.name}</span> (@{user.username})
            </p>
            <img
              src={user.avatar_url}
              alt={user.username}
              className="userAvatar"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
