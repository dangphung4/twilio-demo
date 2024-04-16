import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CallPage from './pages/CallPage';
import TextPage from './pages/TextPage';
import RecordPage from './pages/RecordPage';
import MessagesPage from './pages/MessagesPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/call">Call</Link> | 
        <Link to="/text">Text</Link> | 
        <Link to="/record">Record</Link> |
        <Link to="/messages">Messages</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
