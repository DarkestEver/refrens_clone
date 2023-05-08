import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React , {useState} from "react";

import CreateService from './components/CreateService';
import Home from './pages/Home';

function App() {
  const [ propservices , setpropServices ] = useState([]);
  console.log("APP page " , propservices);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home services={propservices} />} />
          <Route path="/create-service" element={<CreateService setpropServices={setpropServices} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
