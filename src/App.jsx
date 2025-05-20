import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CommentsPage from "../src/pages/CommentsPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;