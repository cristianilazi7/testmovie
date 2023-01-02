import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '../App.css';
import App from "../App";
import  Login from '../components/Login';
const _Routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}  />
                <Route path="/app" element= {<App/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default _Routes;