import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

import "./styles/App.scss";
import "./styles/Header.scss";
import Services from "./pages/Services";
import StethoscopeApp from "./pages/Stethoscope";
import BleDataManager from "./pages/BLEManager";

const App = () => {
  return (
    // <StethoscopeApp />
    <BleDataManager/>
    // <Router>
    //     <Header/>
    //     <Routes>
    //         <Route path='/' element={<Home/>}/>
    //         <Route path='/about' element={<About/>}/>
    //         <Route path='/contact' element={<Contact/>}/>
    //         <Route path='/services' element={<Services/>}/>
    //         <Route path='*' element={<div>Page not found 404</div>}/>
    //     </Routes>
    // </Router>
  );
};

export default App;
