//import logo from './logo.svg';
import './App.css';
import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/navbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap } from 'react-leaflet';


const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

function App() {
  return (
    <>
    {/*<Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                </Routes>
                </Router>*/ }
                
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Around the World Radio Project website.
        </p>
        <a
          className="App-link"
          href="https://pskreporter.info/pskmap.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Psk reporter - original project for reference
        </a>
        <p>
        This website has been created by Antoine Nguyen, Isabel Ruiz, and Gabriel Garcia as a part of their Senior Design Project. This project was advised
        by Prof. Burke of UCI's Electrical Engineering and Computer Science Department. For more information about this project,
        please follow
        <a  className="App-link"
          href="https://sites.uci.edu/eecscapstone/2023/05/04/around-the-world-radio/"
          target="_blank"
          rel="noopener noreferrer"> this link.</a>
      </p>
      </header>
      <body>
        <MapContainer center={[33.64202831323988, -117.84444823454378]} zoom={2} scrollWheelZoom={false} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </body>
    </div>
    
    
    </>
  );
}



export default App;
