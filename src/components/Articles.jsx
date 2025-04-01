import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((response) => {
        setArticles(response.data.articles);
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
    <div className="articlesContainer">
      <h2>Articles</h2>
      <ul className="articlesList">
        {articles.map((article) => (
          <li key={article.article_id} className="article">
            <h3>
              <Link
                to={`/articles/${article.article_id}`}
                className="articleLink"
              >
                {" "}
                {article.title}
              </Link>
            </h3>
            <p>Author: {article.author}</p>
            <p>Topic: {article.topic}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
