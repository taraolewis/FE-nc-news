import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils";

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((response) => {
        setTopics(response.data.topics);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load topics");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="topicsContainer">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`} className="topicLink">
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsPage;
