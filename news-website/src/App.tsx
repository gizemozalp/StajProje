import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/Navbar.css';
import NewsList from './component/NewsList';
import NewsSearch from './component/NewsSearch';
import Navbar from './component/Navbar';

const App: React.FC = () => {  
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsSearch />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
