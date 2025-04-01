import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://be-nc-news-wwtd.onrender.com/api/articles/${articleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        return response.json();
      })
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>
        <strong>By:</strong> {article.author}
      </p>
      <p>
        <strong>Topic:</strong> {article.topic}
      </p>
      <img
        src={article.article_img_url}
        alt={article.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <p>{article.body}</p>
      <p>
        <strong>Votes:</strong> {article.votes}
      </p>
      <p>
        <strong>Comments:</strong> {article.comment_count}
      </p>
      <p>
        <strong>Published:</strong>{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ArticlePage;
