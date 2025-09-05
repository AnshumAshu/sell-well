import React from 'react'
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Footer';
import Header from './Components/Header';
import Scrap from './Components/Scrap_Rate/Scrap';
import Signin from './Components/Pages/Signin';
import Metal from './Components/Metal/Metal';
import Plastic from './Components/Plastic/Plastic';
import Paper from './Components/Paper/Paper';
import Mobile from './Components/Mobile_Computers/Moblie';
import Large from './Components/Large_App/Large';
import Automobiles from './Components/Automobiles/Automobiles';
import Small from './Components/Small_App/Small';
import Contact from './Components/Contact/Contact';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Small' element={<Small/>} />
        <Route path='/Automobiles' element={<Automobiles/>} /> 
        <Route path="/Large" element={<Large/>} />
        <Route path="/Mobile" element={<Mobile/>} />
        <Route path="/Paper" element={<Paper/>} />
        <Route path="/metal" element={<Metal/>} />
        <Route path="/Plastic" element={<Plastic/>} />
        <Route path="/rate" element={<Scrap />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App