import './App.css'; 
import React, { Component, useState, useEffect } from "react";
import AddCliente from './Cliente/ClienteCRUD';
import ComandaCRUD from './Comanda/ComandaCRUD';
import ComandaPlatilloCRUD from './ComandaPlatillo/ComandaPlatilloCRUD';
import PlatilloCRUD from './Platillo/PlatilloCRUD';
import TicketCRUD from './Ticket/TicketCRUD';
import Navbar from './Navbar/Navbar';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './Home'

export default function App(){

    return (      
      <div>
        <Navbar/>
        <BrowserRouter>
          <Routes>
              <Route  path='/' element={<Home/>}/>
              <Route path="/cliente" element={ <AddCliente/>} />
              <Route  path='/comanda' element={<ComandaCRUD/>}/>
              <Route path='/comandaPlatillo' element={<ComandaPlatilloCRUD/>}/>
              <Route  path='/platillo' element={<PlatilloCRUD/>}/>
              <Route path='/ticket' element={<TicketCRUD/>}/>
          </Routes>
        </BrowserRouter>

        
        </div>
      
    );
  
}
