import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter, Router, Route, Routes, Outlet } from 'react-router-dom';
import SearchQuery from "./SearchQuery";

function App() {
    return (
        <BrowserRouter>
            <Routes>
               <Route path='/' element={<Home/>} />
               <Route path='/query' element={<SearchQuery/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;