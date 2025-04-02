import React, { useState } from "react";

function UserProfile() {
  const [user] = useState({
    username: "jessjelly",
    name: "Jess Jelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });

  return (
    <div className="profileContainer">
      <h2>{user.name}</h2>
      <img src={user.avatar_url} alt={user.name} className="profileAvatar" />
      <p>
        <span className="usernameLabel">Username:</span> {user.username}
      </p>
    </div>
  );
}

export default UserProfile;
