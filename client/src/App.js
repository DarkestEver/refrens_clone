import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateService from './components/CreateService';
import EditService from './components/EditService';
import Error from './components/sub-components/Error';
import Failure from './components/sub-components/Failure';
import Home from './pages/Home';
import React from "react";
import Success from './components/sub-components/Success';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/edit-service" element={<EditService />} />
          <Route path="/service/success" element={<Success />} />
          <Route path="/service/failure" element={<Failure />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
