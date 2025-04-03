import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchArticles,
  fetchComments,
  postComment,
  deleteComment,
  voteOnArticle,
} from "../utils";

function ArticlePage() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const loggedInUser = "jessjelly";

  useEffect(() => {
    setLoading(true);

    fetchArticles(articleId)
      .then((response) => {
        setArticle(response.data.article);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch article");
      });

    fetchComments(articleId)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Failed to fetch comments");
        setLoading(false);
      });
  }, [articleId]);

  const handleVote = (voteType) => {
    const incVotes = voteType === "up" ? 1 : -1;
    const newVoteCount = article.votes + incVotes;

    setArticle((prevArticle) => ({ ...prevArticle, votes: newVoteCount }));

    voteOnArticle(articleId, incVotes).catch(() => {
      setArticle((prevArticle) => ({ ...prevArticle, votes: article.votes }));
    });
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await postComment(articleId, {
        username: username,
        body: newComment,
      });
      setComments((prevComments) => [response.data.comment, ...prevComments]);
      setNewComment("");
    } catch (error) {
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      alert("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p className="boldText">By: {article.author}</p>
      <p className="boldText">
        Topic:{" "}
        <Link to={`/topics/${article.topic}`} className="topicLink">
          {article.topic}
        </Link>
      </p>
      <div className="articleImgContainer">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="articleImg"
        />
      </div>
      <p>{article.body}</p>
      <div className="voteContainer">
        <p className="boldText">Votes: {article.votes}</p>
        <button className="voteButton upvote" onClick={() => handleVote("up")}>
          👍 Upvote
        </button>
        <button
          className="voteButton downvote"
          onClick={() => handleVote("down")}
        >
          👎 Downvote
        </button>
      </div>

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

              {comment.author === loggedInUser && (
                <button
                  className="deleteButton"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={deletingCommentId === comment.comment_id}
                >
                  {deletingCommentId === comment.comment_id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username..."
        required
      />
      <form onSubmit={handleCommentSubmit} className="commentForm">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          required
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting || !newComment.trim()}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

export default ArticlePage;
