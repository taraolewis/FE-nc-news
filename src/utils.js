import axios from "axios";

const apiNews = axios.create({
  baseURL: "https://be-nc-news-wwtd.onrender.com/api",
});

export const fetchArticles = (articleId = null) => {
  if (articleId) {
    return apiNews.get(`/articles/${articleId}`);
  } else {
    return apiNews.get("/articles");
  }
};

export const fetchComments = (articleId) => {
  return apiNews.get(`/articles/${articleId}/comments`);
};

export const postComment = (articleId, commentData) => {
  return apiNews.post(`/articles/${articleId}/comments`, commentData);
};

export const deleteComment = (commentId) => {
  return apiNews.delete(`/comments/${commentId}`);
};

export const voteOnArticle = (articleId, inc_votes) => {
  return apiNews.patch(`/articles/${articleId}`, { inc_votes });
};

export const fetchUsers = () => {
  return apiNews.get("/users");
};

export const fetchTopics = () => {
  return apiNews.get("/topics");
};

export default apiNews;
