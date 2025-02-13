import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPeers from './pages/MyPeers';
import CreateProject from './pages/CreateProject';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-peers" element={<MyPeers />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;