//Imports from react
//import { StrictMode } from 'react';
import React from "react"

//Imports from dom/client
//import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom/client";

//Import the router from react-router-dom
import { BrowserRouter } from "react-router-dom";

//Basic imports
import './css/index.css';
import App from './App.jsx';
import "./css/desktop.css";
import "./css/tablet.css";
import "./css/mobile.css";


//Import leaflet css
import 'leaflet/dist/leaflet.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
