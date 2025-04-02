import axios from "axios";

const apiNews = axios.create({
  baseURL: "https://be-nc-news-wwtd.onrender.com/api",
  timeout: 10000,
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

export const voteOnArticle = (articleId, inc_votes) => {
  return apiNews.patch(`/articles/${articleId}`, { inc_votes });
};

export default apiNews;
