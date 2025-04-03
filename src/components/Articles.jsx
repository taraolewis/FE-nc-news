import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils";
import { useSearchParams } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);

    fetchArticles(sortBy, order)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [sortBy, order]);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSearchParams({ sort_by: newSortBy, order });
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSearchParams({ sort_by: sortBy, order: newOrder });
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articlesContainer">
      <h2>Articles</h2>

      <div className="sortControls">
        <label>Sort By: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </select>

        <label>Order: </label>
        <select value={order} onChange={handleOrderChange}>
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>

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
            <p>Votes: {article.votes}</p>
            <p>
              Published: {new Date(article.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
