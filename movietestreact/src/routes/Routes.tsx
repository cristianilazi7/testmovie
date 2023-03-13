import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "../App";

import '../App.css';
import Login from "../components/Login/Login";
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