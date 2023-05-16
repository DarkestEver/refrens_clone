import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateService from './pages/CreateService.js/CreateService';
import EditService from './components/ServicesComponents/EditService';
import Error from './components/ServicesComponents/sub-components/Error';
import Failure from './components/ServicesComponents/sub-components/Failure';
import Home from './components/ServicesComponents/Services';
import QuotationsAndEstimates from './components/QuotationComponents/QuotationsAndEstimates';
import React from "react";
import Success from './components/ServicesComponents/sub-components/Success';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotations-and-estimates" element={<QuotationsAndEstimates />} />
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
