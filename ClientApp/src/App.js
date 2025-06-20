import React from "react";
import Dashboard from "./components/Dashboard";
import ArticleList from "./components/ArticleList";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-[#181824] text-gray-100 font-sans">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-400 tracking-tight drop-shadow-lg">
          <span role="img" aria-label="journal">📰</span> Article CRUD Dashboard
        </h1>
        <Dashboard />
        <ArticleList />
      </div>
    </div>
  );
}

export default App;
