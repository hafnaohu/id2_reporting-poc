//Imports from react
//import { StrictMode } from 'react';
import React from "react"

//Imports from dom/client
//import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom/client";

//Import the router from react-router-dom
import { BrowserRouter } from "react-router-dom";

//Basic imports
import './index.css';
import App from './App.jsx';

//Import leaflet css
import 'leaflet/dist/leaflet.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
