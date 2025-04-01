import React, { useState, useEffect } from "react";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://be-nc-news-wwtd.onrender.com/api/articles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <h3>{article.title}</h3>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
