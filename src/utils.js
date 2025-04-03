import axios from "axios";

const apiNews = axios.create({
  baseURL: "https://be-nc-news-wwtd.onrender.com/api",
});

export const fetchArticles = (sort_by = "created_at", order = "desc") => {
  return apiNews.get(`/articles?sort_by=${sort_by}&order=${order}`);
};

export const fetchArticle = (articleId) => {
  return apiNews.get(`/articles/${articleId}`);
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
