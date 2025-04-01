import axios from "axios";

const apiNews = axios.create({
  baseURL: "https://be-nc-news-wwtd.onrender.com/api",
  timeout: 10000,
});

export const fetchArticles = () => {
  return apiNews.get("/articles");
};

export { apiNews };
