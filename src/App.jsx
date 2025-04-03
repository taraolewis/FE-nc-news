import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Homepage from "./components/Homepage";
import ArticlePage from "./components/ArticlePage";
import UserProfile from "./components/UserProfile";
import Users from "./components/Users";
import TopicsPage from "./components/TopicsPage";
import TopicArticlesPage from "./components/TopicArticlesPage";

function Home() {
  return (
    <div>
      <h2 className="welcomeText">Welcome to the Home Page</h2>
      <Homepage />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topicSlug" element={<TopicArticlesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
