import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiNews } from "../utils";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    apiNews
      .get(`/articles/${articleId}`)
      .then((response) => {
        setArticle(response.data.article);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch article");
      });

    apiNews
      .get(`/articles/${articleId}/comments`)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch comments");
        setLoading(false);
      });
  }, [articleId]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p className="boldText">By: {article.author}</p>
      <p className="boldText">Topic: {article.topic}</p>
      <div className="articleImgContainer">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="articleImg"
        />
      </div>
      <p>{article.body}</p>
      <p className="boldText">Votes: {article.votes}</p>
      <p className="boldText">
        Published: {new Date(article.created_at).toLocaleDateString()}
      </p>

      <h3>{comments.length} Comments:</h3>
      <div className="commentsContainer">
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.comment_id} className="commentCard">
              <p className="commentAuthor">{comment.author} says:</p>
              <p>{comment.body}</p>
              <p className="commentDate">
                Posted on: {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ArticlePage;
