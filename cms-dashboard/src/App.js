import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BlogEditor from './components/BlogEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:id" element={<BlogEditor />} />
        <Route path="/new" element={<BlogEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
