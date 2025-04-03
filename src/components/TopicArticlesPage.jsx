import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticles } from "../utils";

function TopicArticlesPage() {
  const { topicSlug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((response) => {
        const allArticles = response.data.articles;
        const filteredArticles = allArticles.filter(
          (article) => article.topic === topicSlug
        );
        setArticles(filteredArticles);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load articles");
        setLoading(false);
      });
  }, [topicSlug]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="topicArticlesContainer">
      <h2>Articles on {topicSlug}</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicArticlesPage;
